import type { DataPoint } from './types';
import React from 'react';
import LineChart from './LineChart';
import ChartWrap from './ChartWrap';

const data: DataPoint[] = [
  [100, 3123],
  [150, 2133],
  [200, 6132]
];

const TransactionsChart = () => {
  return (
    <ChartWrap title='Transactions'>
      <LineChart data={data} />
    </ChartWrap>
  )
}

export default TransactionsChart;
