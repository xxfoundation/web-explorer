import React from 'react';
import { DataPoint } from '../../types';
import { LineChart } from '../charts/highcharts';
import { formatPercent, tooltipFormatter } from './formatters';

const data: DataPoint[] = [[665,0.01], [789,.30], [13, .1], [75,.23]];

const AverageAnnualReturn = () => {
  const sortedAnnualReturn = data.sort((a: DataPoint, b: DataPoint) => a[0] - b[0]);
  
  return (
    <LineChart
      title='average annual return'
      data={sortedAnnualReturn}
      tooltipFormatter={tooltipFormatter}
      labelFormatters={{
        yAxis: formatPercent
      }}
    />
  );
};

export default AverageAnnualReturn;
