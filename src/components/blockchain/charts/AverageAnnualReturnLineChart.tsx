import React from 'react';
import { DataPoint } from '../../../types';
import { LineChart } from '../../charts/highcharts';
import DefaultTile from '../../DefaultTile';
import { formatPercent, percentTooltipFormatter } from './formatters';

const data: DataPoint[] = [
  [665, 0.01],
  [789, 0.3],
  [13, 0.1],
  [75, 0.23]
];

const AverageAnnualReturn = () => {
  const sortedAnnualReturn = data.sort((a: DataPoint, b: DataPoint) => a[0] - b[0]);

  return (
    <DefaultTile header='Average Annual Return'>
      <LineChart
        data={sortedAnnualReturn}
        tooltipFormatter={percentTooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
      />
    </DefaultTile>
  );
};

export default AverageAnnualReturn;
