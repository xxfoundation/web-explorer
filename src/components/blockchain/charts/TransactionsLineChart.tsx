import React from 'react';
import { amountByEraTooltip } from './formatters';
import { DataPoint } from '../../../types';
import * as Highcharts from '../../charts/highcharts';
import PaperWithHeader from '../PaperWithHeader';

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
    <PaperWithHeader header='Transactions'>
      <Highcharts.LineChart data={sortedTransactions} tooltipFormatter={amountByEraTooltip} />
    </PaperWithHeader>
  );
};

export default TransactionsChart;
