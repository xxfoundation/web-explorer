import { useSubscription } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { LISTEN_FOR_NEW_ACCOUNTS } from '../../../schemas/accounts.schema';
import ChartWrap from '../ChartWrap';

const NewAccountsChart = () => {
  const { data, loading } = useSubscription<{ new_accounts: { accounts: number; era: number }[] }>(
    LISTEN_FOR_NEW_ACCOUNTS
  );

  const chartData: DataPoint[] = useMemo(
    () => (data?.new_accounts || []).map((item) => [item.era, item.accounts], [data?.new_accounts]),
    [data?.new_accounts]
  );
  if (loading) {
    return (
      <Box
        sx={{ height: '400px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <ChartWrap title='New Accounts'>
      <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} />
    </ChartWrap>
  );
};

export default NewAccountsChart;
