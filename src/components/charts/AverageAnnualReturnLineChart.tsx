import type { DataPoint } from './highcharts';
import React from 'react';
import { LineChart, percentTooltipFormatter } from './highcharts';
import ChartWrap from './highcharts/ChartWrap';


const data: DataPoint[] = [
  [665, 0.01],
  [789, 0.3],
  [13, 0.1],
  [75, 0.23]
];

const AverageAnnualReturn = () => {
  return (
    <ChartWrap title='Average Annual Return'>
      <LineChart
        tooltipFormatter={percentTooltipFormatter}
        data={data}
      />
    </ChartWrap>
  );
};

export default AverageAnnualReturn;
