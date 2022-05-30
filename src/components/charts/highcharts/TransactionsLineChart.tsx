import { useSubscription } from '@apollo/client';
import React, { useMemo } from 'react';
import {
  ListenForEraTransactions,
  LISTEN_FOR_ERA_TRANSACTIONS
} from '../../../schemas/transfers.schema';
import ChartWrap from './ChartWrap';
import LineChart from './LineChart';
import { DataPoint } from './types';

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
    <ChartWrap title='Transactions' loading={loading}>
      <LineChart data={chartData} />
    </ChartWrap>
  );
};

export default TransactionsChart;
