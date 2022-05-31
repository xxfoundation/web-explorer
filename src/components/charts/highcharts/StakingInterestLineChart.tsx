import React from 'react';
import type { DataPoint } from '.';
import { LineChart, decimalTooltipFormatter } from '.';
import ChartWrap from '../ChartWrap';

const data: DataPoint[] = [
  [665, 0.01],
  [789, 0.3],
  [13, 0.1],
  [75, 0.23]
];

const StakingInterestChart = () => {
  return (
    <ChartWrap title='Staking Interest (APY)'>
      <LineChart tooltipFormatter={decimalTooltipFormatter} data={data} />
    </ChartWrap>
  );
};

export default StakingInterestChart;
