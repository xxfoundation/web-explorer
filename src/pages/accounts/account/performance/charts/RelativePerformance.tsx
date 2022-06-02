import React, { FC } from 'react';
import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import DefaultTile from '../../../../../components/DefaultTile';

const sampleDataRelativePerformance: DataPoint[] = [
  [515, 0.8],
  [521, 0.01],
  [545, 0.3]
];

const RelativePerformance: FC = () => {
  return (
    <DefaultTile header={'relative performance'}>
      <LineChart data={sampleDataRelativePerformance} />
    </DefaultTile>
  );
};

export default RelativePerformance;
