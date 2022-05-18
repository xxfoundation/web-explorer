import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { AccountType } from '../../types';
import Charts from './Charts';
import MetricCards from './MetricsCards';

const PerformanceCard: FC<{ account: AccountType }> = ({ account }) => {
  const incompatibleRole = useMemo(() => !account.roles.includes('validator'), [account]);
  const panels = useMemo(() => {
    if (incompatibleRole) return [];
    return [
      {
        label: <Typography>metrics</Typography>,
        content: <MetricCards account={account} />
      },
      {
        label: <Typography>charts</Typography>,
        content: <Charts />
      }
    ];
  }, [account, incompatibleRole]);
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
