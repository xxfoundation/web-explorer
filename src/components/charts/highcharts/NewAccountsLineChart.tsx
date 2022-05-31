import React from 'react';
import type { DataPoint } from '.';
import { LineChart, amountByEraTooltip } from '.';
import ChartWrap from '../ChartWrap';

const data: DataPoint[] = [
  [123, 1231],
  [441, 6671],
  [155, 667]
];

const NewAccountsChart = () => {
  return (
    <ChartWrap title='New Accounts'>
      <LineChart tooltipFormatter={amountByEraTooltip} data={data} />
    </ChartWrap>
  );
};

export default NewAccountsChart;
