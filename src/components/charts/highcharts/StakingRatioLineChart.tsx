import React from 'react';
import type { DataPoint } from '.';
import { LineChart, percentTooltipFormatter, formatPercent } from '.';
import ChartWrap from '../ChartWrap';

const data: DataPoint[] = [
  [90, 0.01],
  [72, 0.31],
  [62, 0.23]
];

const StakingRatioChart = () => {
  return (
    <ChartWrap title='Staking Ratio'>
      <LineChart
        tooltipFormatter={percentTooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
        data={data}
      />
    </ChartWrap>
  );
};

export default StakingRatioChart;
