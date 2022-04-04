import { default as React } from 'react';
import { DataPoint } from '../../types';
import { LineChart } from '../charts/highcharts';
import { formatPercent, tooltipFormatter } from './formatters';
import PaperWithHeader from './PaperWithHeader';

const data: DataPoint[] = [
  [665, 0.01],
  [789, 0.3],
  [13, 0.1],
  [75, 0.23]
];

const AverageAnnualReturn = () => {
  const sortedAnnualReturn = data.sort((a: DataPoint, b: DataPoint) => a[0] - b[0]);

  return (
    <PaperWithHeader header='Average Annual Return'>
      <LineChart
        data={sortedAnnualReturn}
        tooltipFormatter={tooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
      />
    </PaperWithHeader>
  );
};

export default AverageAnnualReturn;
