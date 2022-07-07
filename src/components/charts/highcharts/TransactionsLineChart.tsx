import { useSubscription } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import {
  ListenForEraTransactions,
  LISTEN_FOR_ERA_TRANSACTIONS
} from '../../../schemas/transfers.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

const NUM_LAST_ERAS = 60;

const TransactionsChart = () => {
  const { data, loading } = useSubscription<ListenForEraTransactions>(LISTEN_FOR_ERA_TRANSACTIONS);
  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransactions || [])
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transactions], [data?.eraTransactions])
        .slice(-NUM_LAST_ERAS) as DataPoint[],
    [data?.eraTransactions]
  );
  return (
    <DefaultTile header='Transactions' height='400px'>
      {loading ? <Loader /> : <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} />}
    </DefaultTile>
  );
};

export default TransactionsChart;
