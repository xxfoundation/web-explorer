import { useQuery } from '@apollo/client';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import NominatorsTable from './NominatorsTable';
import StakingRewardsTable from './StakingRewardsTable';
import ValidatorStatsTable from './ValidatorStatsTable';
import ValidatorInfo from '../ValidatorSummary';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetStakingRewardCounts, GET_STAKING_REWARDS_COUNTS } from '../../../../schemas/accounts.schema';
import { GetValidatorStats } from '../../../../schemas/staking.schema';

const StakingCard: FC<{
  accountId: string;
  active: boolean;
  validator: GetValidatorStats;
}> = ({ accountId, active, validator }) => {
  const validatorInfo = validator?.stats && validator?.stats[0];
  const nominators = validatorInfo?.nominators
    ?.slice()
    .sort((a, b) => parseFloat(b.share) - parseFloat(a.share));

  const validatorStats = validator?.stats;
  const statsCount = validator?.aggregates.aggregate.count;

  const { data, loading } = useQuery<GetStakingRewardCounts>(GET_STAKING_REWARDS_COUNTS, {
    variables: { accountId: accountId }
  });
  const rewardsCount = data?.rewardsInfo.aggregate.count || 0;
  const rewardsSum = data?.rewardsInfo.aggregate.sum.amount;

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
            message={'Staking Rewards'}
            count={rewardsCount === undefined ? '' : rewardsCount}
          />
        ),
        content: <StakingRewardsTable accountId={accountId} sum={rewardsSum} />
      }
    ];

    if (validatorInfo) {
      cachedPanels.push(
        {
          label: <Typography>Validator Info</Typography>,
          content: <ValidatorInfo active={active} info={validatorInfo} />
        },
        {
          label: <TabText message='Validator Stats' count={statsCount} />,
          content: <ValidatorStatsTable accountId={accountId} stats={validatorStats} />
        }
      )
    }
    
    if (active && nominators) {
      cachedPanels.push({
        label: <TabText message='nominators' count={nominators?.length} />,
        content: <NominatorsTable nominators={nominators} />
      });
    }
    return cachedPanels;
  }, [accountId, active, loading, nominators, rewardsCount, rewardsSum, statsCount, validatorInfo, validatorStats]);

  return (
    !loading ? (<TabsWithPanels panels={panels} tabsLabel='account staking card' />) : <>
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
