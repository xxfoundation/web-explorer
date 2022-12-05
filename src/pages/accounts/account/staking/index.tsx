import { useQuery } from '@apollo/client';
import { Box, Stack, Skeleton } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetStakingCounts, GET_STAKING_COUNTS } from '../../../../schemas/accounts.schema';
import StakingEventsTable from './StakingEventsTable';
import StakingRewardsTable from './StakingRewardsTable';
import StakingSlashesTable from './StakingSlashesTable';

const StakingCard: FC<{ accountId: string; }> = ({ accountId }) => {
  const { t } = useTranslation();
  const { data, loading } = useQuery<GetStakingCounts>(GET_STAKING_COUNTS, {
    variables: { accountId: accountId }
  });
  const rewardsCount = data?.rewards.aggregate.count || 0;
  const rewardsSum = data?.rewards.aggregate.sum.amount;
  const slashesCount = data?.slashes.aggregate.count || 0;
  const slashesSum = data?.slashes.aggregate.sum.amount;
  const stakingCount = data?.stakingEvents.aggregate.count

  const panels = useMemo(() => {
    const cachedPanels = loading
      ? [
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          }
        ]
      : [
      {
        label: (
          <TabText
            message={t('Rewards')}
            count={rewardsCount === undefined ? '' : rewardsCount}
          />
        ),
        content: <StakingRewardsTable accountId={accountId} sum={rewardsSum} />
      },
      {
        label: (
          <TabText
            message={t('Slashes')}
            count={slashesCount === undefined ? '' : slashesCount}
          />
        ),
        content: <StakingSlashesTable accountId={accountId} sum={slashesSum} />
      },
      {
        label: (
          <TabText
            message={t('Events')}
            count={stakingCount === undefined ? '' : stakingCount}
          />
        ),
        content: (
          <StakingEventsTable accountId={accountId} />
        )
      }
    ];
    
    return cachedPanels;
  }, [accountId, loading, rewardsCount, rewardsSum, slashesCount, slashesSum, stakingCount, t]);

  const isEmpty = () => {
    return !rewardsCount && !stakingCount && !slashesCount && !loading;
  }

  return isEmpty() ? <div>{t('No activity')}</div> : (
    !loading ? (<TabsWithPanels panels={panels} tabsLabel={t('account staking card')} />) : <>
      <Stack sx={{ py: 3 }} spacing={2} direction='row'>
        <Skeleton width={160} />
        <Skeleton width={160} />
        <Skeleton width={160} />
        <Skeleton width={160} />
      </Stack>
      <Box sx={{ mt: 4 }}>
        <TableSkeleton rows={10} cells={5} />
      </Box>
    </>
  );
};

export default StakingCard;
