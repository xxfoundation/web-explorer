import { useSubscription } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import {
  ListenForEraTransactions,
  LISTEN_FOR_ERA_TRANSACTIONS
} from '../../../schemas/transfers.schema';
import ChartWrap from '../ChartWrap';

const TransactionsChart = () => {
  const { data, loading } = useSubscription<ListenForEraTransactions>(LISTEN_FOR_ERA_TRANSACTIONS);
  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransactions || [])
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transactions], [data?.eraTransactions]),
    [data?.eraTransactions]
  );
  return (
    <ChartWrap title='Transactions'>
      {loading ? (
        <Box
          sx={{ height: '400px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
        >
          <CircularProgress />
        </Box>
      ) : data?.eraTransactions && data.eraTransactions.length ? (
        <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} />
      ) : (
        <Typography textAlign='center'>no data</Typography>
      )}
    </ChartWrap>
  );
};

export default TransactionsChart;
