import { default as React } from 'react';
import { DataPoint } from '../../types';
import LineChart from '../charts/highcharts/LineChart';
import { formatPercent, tooltipFormatter } from './formatters';
import PaperWithHeader from './PaperWithHeader';

const data: DataPoint[] = [
  [90, 0.01],
  [72, 0.31],
  [62, 0.23]
];

const StakingRatio = () => {
  const sortedAccounts = data.sort((a: number[], b: number[]) => a[0] - b[0]);
  return (
    <PaperWithHeader header='Staking Ratio'>
      <LineChart
        data={sortedAccounts}
        tooltipFormatter={tooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
      />
    </PaperWithHeader>
  );
};

export default StakingRatio;
