import { useQuery } from '@apollo/client';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetNominatorStats, GET_NOMINATOR_STATS } from '../../../../schemas/staking.schema';
import { GetNominatorInfo, GET_NOMINATOR_INFO } from '../../../../schemas/nominator.schema';
import NominatorSummary from './NominatorSummary';
import NominatorStatsTable from './NominatorStatsTable';

const NominatorCard: FC<{
  accountId: string;
}> = ({ accountId }) => {
  const queryNominatorInfo = useQuery<GetNominatorInfo>(GET_NOMINATOR_INFO, {
    variables: { accountId: accountId }
  });
  const nominatorInfo = queryNominatorInfo?.data?.nominator[0]

  const queryNominatorStats = useQuery<GetNominatorStats>(GET_NOMINATOR_STATS, {
    variables: { accountId: accountId }
  });
  const nominatorStats = queryNominatorStats.data?.stats
  const statsCount = queryNominatorStats.data?.aggregates.aggregate.count;

  const panels = useMemo(() => {
    const cachedPanels = (queryNominatorStats.loading || queryNominatorInfo.loading)
      ? [
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          }
        ]
      : [
      {
        label: <Typography>Nominator Info</Typography>,
        content: <NominatorSummary info={nominatorInfo} />
      },
      {
        label: <TabText message='Nominator Stats' count={statsCount} />,
        content: <NominatorStatsTable stats={nominatorStats} />
      }
    ];

    return cachedPanels;
  }, [queryNominatorInfo.loading, queryNominatorStats.loading, statsCount, nominatorInfo, nominatorStats]);

  const isEmpty = () => {
    return !queryNominatorInfo.data?.nominator.length && !queryNominatorStats.data?.aggregates.aggregate.count && !(queryNominatorInfo.loading || queryNominatorStats.loading);
  }

  return isEmpty() ? <div>No activity</div> : (
    !(queryNominatorInfo.loading || queryNominatorStats.loading) ? (<TabsWithPanels panels={panels} tabsLabel='account staking card' />) : <>
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
  )
};

export default NominatorCard;
