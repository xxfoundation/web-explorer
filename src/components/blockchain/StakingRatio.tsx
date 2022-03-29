import React from 'react';
import { DataPoint } from '../../types';
import LineChart from '../charts/highcharts/LineChart';
import { formatPercent, tooltipFormatter } from './formatters';

const data: DataPoint[] = [[90,0.01], [72,0.31], [62,0.23]]

const StakingRatio = () => {
  const sortedAccounts = data.sort((a: number[], b: number[]) => a[0] - b[0]);
  return (
    <>
      <LineChart
        title='staking ratio'
        data={sortedAccounts}
        tooltipFormatter={tooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
      />
    </>
  );
};

export default StakingRatio;
