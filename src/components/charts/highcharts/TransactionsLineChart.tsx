import React from 'react';
import type { DataPoint } from '.';
import { LineChart, amountByEraTooltip } from '.';
import ChartWrap from '../ChartWrap';

const data: DataPoint[] = [
  [100, 3123],
  [150, 2133],
  [200, 6132]
];

const TransactionsChart = () => {
  return (
    <ChartWrap title='Transactions'>
      <LineChart tooltipFormatter={amountByEraTooltip} data={data} />
    </ChartWrap>
  );
};

export default TransactionsChart;
