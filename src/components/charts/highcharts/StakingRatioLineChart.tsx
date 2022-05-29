import type { DataPoint } from '.';
import React from 'react';
import {  percentTooltipFormatter, formatPercent } from './formatters';
import LineChart from './LineChart';
import ChartWrap from './ChartWrap';

const data: DataPoint[] = [
  [90, 0.01],
  [72, 0.31],
  [62, 0.23]
];

const StakingRatio = () => {
  return (
    <ChartWrap title='Staking Ratio'>
      <LineChart
        tooltipFormatter={percentTooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
        data={data} />
    </ChartWrap>
  );
};

export default StakingRatio;
