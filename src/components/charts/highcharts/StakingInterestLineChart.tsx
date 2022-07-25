import React from 'react';
import type { DataPoint } from '.';
import { decimalTooltipFormatter, LineChart } from '.';
import DefaultTile from '../../DefaultTile';

const data: DataPoint[] = [
  [665, 0.01],
  [789, 0.3],
  [13, 0.1],
  [75, 0.23]
];

const StakingInterestChart = () => {
  return (
    <DefaultTile header='staking interest (apy)' height='400px'>
      <LineChart tooltipFormatter={decimalTooltipFormatter} data={data} />
    </DefaultTile>
  );
};

export default StakingInterestChart;
