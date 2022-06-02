import React, { FC } from 'react';
import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import DefaultTile from '../../../../../components/DefaultTile';

const sampleDataEra: DataPoint[] = [
  [515, 17000],
  [521, 23000],
  [545, 9000]
];

const EraPoints: FC = () => {
  return (
    <DefaultTile header={'era points'}>
      <LineChart data={sampleDataEra} />
    </DefaultTile>
  );
};

export default EraPoints;
