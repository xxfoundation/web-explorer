import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Account } from '../../../../schemas/accounts.schema';
import { GetRankingByAccountId } from '../../../../schemas/ranking.schema';
import Charts from './Charts';
import MetricCards from './MetricsCards';

const PerformanceCard: FC<{ account: Account; ranking: GetRankingByAccountId['ranking'] }> = ({
  account,
  ranking
}) => {
  const incompatibleRole = useMemo(() => !(account.roles || []).includes('validator'), [account]);
  const panels = useMemo(() => {
    if (incompatibleRole) return [];
    return [
      {
        label: <Typography>metrics</Typography>,
        content: <MetricCards account={account} ranking={ranking} />
      },
      {
        label: <Typography>charts</Typography>,
        content: <Charts />
      }
    ];
  }, [account, incompatibleRole, ranking]);
  if (incompatibleRole) return <></>;
  return (
    <Box padding={'40px'}>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Performance
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account performance card' tabMarginBottom={'1'} />
    </Box>
  );
};

export default PerformanceCard;
