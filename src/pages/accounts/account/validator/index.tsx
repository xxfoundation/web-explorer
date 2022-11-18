import { useQuery } from '@apollo/client';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import NominatorsTable from './NominatorsTable';
import ValidatorStatsTable from './ValidatorStatsTable';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetValidatorStats, GET_VALIDATOR_STATS } from '../../../../schemas/staking.schema';
import { GetValidatorInfo, GET_VALIDATOR_INFO } from '../../../../schemas/validator.schema';
import ValidatorSummary from './ValidatorSummary';

type Props = {
  accountId: string;
  active: boolean;
}

const ValidatorCard: FC<Props> = ({ accountId, active }) => {
  const { t } = useTranslation();
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
        label: <Typography>{t('Validator Info')}</Typography>,
        content: <ValidatorSummary active={active} info={validatorInfo} />
      },
      {
        label: <TabText message='Validator Stats' count={statsCount} />,
        content: <ValidatorStatsTable accountId={accountId} stats={validatorStats} />
      }
    ];
    
    if (active && nominators) {
      cachedPanels.push({
        label: <TabText message='Active Nominators' count={nominators?.length} />,
        content: <NominatorsTable nominators={nominators} />
      });
    }
    return cachedPanels;
  }, [accountId, active, nominators, queryValidatorInfo.loading, queryValidatorStats.loading, statsCount, t, validatorInfo, validatorStats]);

  const isEmpty = () => {
    return !queryValidatorInfo.data?.validator.length && !queryValidatorStats.data?.aggregates.aggregate.count && !(queryValidatorInfo.loading || queryValidatorStats.loading);
  }

  return isEmpty() ? <div>{t('No activity')}</div> : (
    !(queryValidatorInfo.loading || queryValidatorStats.loading) ? (<TabsWithPanels panels={panels} tabsLabel={t('account staking card')} />) : <>
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
