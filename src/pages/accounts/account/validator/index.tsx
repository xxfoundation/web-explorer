import { useQuery } from '@apollo/client';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import NominatorsTable from './NominatorsTable';
import ValidatorStatsTable from './ValidatorStatsTable';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetValidatorStats, GET_VALIDATOR_STATS } from '../../../../schemas/staking.schema';
import { GetValidatorInfo, GET_VALIDATOR_INFO } from '../../../../schemas/validator.schema';
import ValidatorSummary from './ValidatorSummary';
import MetricCards from '../performance/MetricsCards';
import Charts from '../performance/charts';
import {Account} from '../../../../schemas/accounts.schema';

const ValidatorCard: FC<{
  accountId: string;
  account: Account;
  active: boolean;
}> = ({ account, accountId, active }) => {
  const queryValidatorInfo = useQuery<GetValidatorInfo>(GET_VALIDATOR_INFO, {
    variables: { accountId: accountId }
  });
  const validatorInfo = queryValidatorInfo?.data?.validator[0]

  const queryValidatorStats = useQuery<GetValidatorStats>(GET_VALIDATOR_STATS, {
    variables: { accountId: accountId }
  });
  const validatorStats = queryValidatorStats.data?.stats

  const nominators = validatorStats && validatorStats[0] && validatorStats[0].nominators
    ?.slice()
    .sort((a, b) => parseFloat(b.share) - parseFloat(a.share));

  const statsCount = queryValidatorStats.data?.aggregates.aggregate.count;

  const panels = useMemo(() => {
    const cachedPanels = (queryValidatorStats.loading || queryValidatorInfo.loading)
      ? [
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          }
        ]
      : [
      {
        label: <Typography>Validator Info</Typography>,
        content: <ValidatorSummary info={validatorInfo} />
      },
      {
        label: <TabText message='Validator Stats' count={statsCount} />,
        content: <ValidatorStatsTable accountId={account?.id} stats={validatorStats} />
      }
    ];
    
    if (active && nominators) {
      cachedPanels.push({
        label: <TabText message='Active Nominators' count={nominators?.length} />,
        content: <NominatorsTable nominators={nominators} />
      });
    }
    if (account.validator) {
      cachedPanels.push(
        {
          label: <TabText message='Metrics' />,
          content: <MetricCards account={account} stats={validatorStats || []} />
        })
    }
    if (validatorStats) {
      cachedPanels.push(
        {
          label: <TabText message='Charts' />,
          content: <Charts account={account} />
        })
    }
    return cachedPanels;
  }, [account, active, nominators, queryValidatorInfo.loading, queryValidatorStats.loading, statsCount, validatorInfo, validatorStats]);

  const isEmpty = () => {
    return !queryValidatorInfo.data?.validator.length && !queryValidatorStats.data?.aggregates.aggregate.count && !(queryValidatorInfo.loading || queryValidatorStats.loading);
  }

  return isEmpty() ? <div>No activity</div> : (
    !(queryValidatorInfo.loading || queryValidatorStats.loading) ? (<TabsWithPanels panels={panels} tabsLabel='account staking card' />) : <>
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

export default ValidatorCard;
