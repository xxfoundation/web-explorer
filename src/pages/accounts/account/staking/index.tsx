import { useQuery } from '@apollo/client';
import { Box, Stack, Skeleton } from '@mui/material';
import React, { FC, useMemo } from 'react';

import StakingRewardsTable from './StakingRewardsTable';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetStakingRewardCounts, GET_STAKING_REWARDS_COUNTS } from '../../../../schemas/accounts.schema';

const StakingCard: FC<{
  accountId: string;
}> = ({ accountId}) => {
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
    
    return cachedPanels;
  }, [accountId, loading, rewardsCount, rewardsSum]);

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
