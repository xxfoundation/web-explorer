import React from 'react';
import { amountByEraTooltip } from './formatters';
import { DataPoint } from '../../../types';
import * as Highcharts from '../../charts/highcharts';
import DefaultTile from '../../DefaultTile';

const data: { transactions: DataPoint[] } = {
  transactions: [
    [100, 3123],
    [150, 2133],
    [200, 6132]
  ]
};

const sortTransactions = ({ transactions }: { transactions: DataPoint[] }) => {
  return transactions.sort((a, b) => {
    return a[0] - b[0];
  });
};

const TransactionsChart = () => {
  const sortedTransactions = sortTransactions(data);

  return (
    <DefaultTile header='Transactions'>
      <Highcharts.LineChart data={sortedTransactions} tooltipFormatter={amountByEraTooltip} />
    </DefaultTile>
  );
};

export default TransactionsChart;
