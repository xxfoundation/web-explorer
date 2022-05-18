import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { formatPercent } from '../../../../components/blockchain/charts/formatters';
import { LineChart } from '../../../../components/charts/highcharts';
import DefaultTile from '../../../../components/DefaultTile';
import { DataPoint } from '../../../../types';

const sampleDataEra: DataPoint[] = [
  [515, 17000],
  [521, 23000],
  [545, 9000]
];
const sampleDataRelativePerformance: DataPoint[] = [
  [515, 0.8],
  [521, 0.01],
  [545, 0.3]
];
const sampleDataCommission: DataPoint[] = [
  [515, .96],
  [521, .50],
  [545, .72]
];
const sampleDataElectedSelfStake: DataPoint[] = [
  [515, 50000],
  [521, 76000],
  [545, 89000]
];

const Charts: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <DefaultTile header={'relative performance'}>
          <LineChart data={sampleDataRelativePerformance} />
        </DefaultTile>
      </Grid>
      <Grid item xs={12} md={6}>
        <DefaultTile header={'era points'}>
          <LineChart data={sampleDataEra} />
        </DefaultTile>
      </Grid>
      <Grid item xs={12} md={6}>
        <DefaultTile header={'commission'}>
          <LineChart
            data={sampleDataCommission}
            labelFormatters={{
              yAxis: formatPercent
            }}
          />
        </DefaultTile>
      </Grid>
      <Grid item xs={12} md={6}>
        <DefaultTile header={'elected self stake'}>
          <LineChart data={sampleDataElectedSelfStake} />
        </DefaultTile>
      </Grid>
    </Grid>
  );
};

export default Charts;
