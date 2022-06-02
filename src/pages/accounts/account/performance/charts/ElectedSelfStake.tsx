import React, { FC } from 'react';
import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import DefaultTile from '../../../../../components/DefaultTile';

const sampleDataElectedSelfStake: DataPoint[] = [
  [515, 50000],
  [521, 76000],
  [545, 89000]
];

const ElectedSelfStake: FC = () => {
  return (
    <DefaultTile header={'elected self stake'}>
      <LineChart data={sampleDataElectedSelfStake} />
    </DefaultTile>
  );
};

export default ElectedSelfStake;
