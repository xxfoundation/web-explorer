import React, { FC } from 'react';
import { DataPoint, formatPercent, LineChart } from '../../../../../components/charts/highcharts';
import DefaultTile from '../../../../../components/DefaultTile';

const sampleDataCommission: DataPoint[] = [
  [515, 0.96],
  [521, 0.5],
  [545, 0.72]
];

const Commission: FC = () => {
  return (
    <DefaultTile header={'commission'}>
      <LineChart
        data={sampleDataCommission}
        labelFormatters={{
          yAxis: formatPercent
        }}
      />
    </DefaultTile>
  );
};

export default Commission;
