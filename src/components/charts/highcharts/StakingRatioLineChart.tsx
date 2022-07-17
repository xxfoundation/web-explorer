import React from 'react';
import type { DataPoint } from '.';
import { formatPercent, LineChart, percentTooltipFormatter } from '.';
import DefaultTile from '../../DefaultTile';

const data: DataPoint[] = [
  [90, 0.01],
  [72, 0.31],
  [62, 0.23]
];

const StakingRatioChart = () => {
  return (
    <DefaultTile header='staking ratio' height='400px'>
      <LineChart tooltipFormatter={percentTooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
        data={data} />
    </DefaultTile>
  );
};

export default StakingRatioChart;
