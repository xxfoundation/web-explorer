import { useSubscription } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import {
  ListenForEraTransactions,
  LISTEN_FOR_ERA_TRANSACTIONS
} from '../../../schemas/transfers.schema';
import ChartWrap from '../ChartWrap';

const data: DataPoint[] = [
  [100, 3123],
  [150, 2133],
  [200, 6132]
];

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
      <LineChart tooltipFormatter={amountByEraTooltip} data={data} />
      <LineChart data={chartData} />
    </ChartWrap>
  );
};

export default TransactionsChart;
