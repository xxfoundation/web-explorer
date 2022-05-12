import { Grid } from '@mui/material';
import React, { FC } from 'react';
import PaperWithHeader from '../../../../components/blockchain/PaperWithHeader';
import { LineChart } from '../../../../components/charts/highcharts';
import { DataPoint } from '../../../../types';

const data: DataPoint[] = [
  [515, 17000],
  [521, 23000],
  [545, 9000]
];

const Charts: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <PaperWithHeader header={'era points'}>
          <LineChart
            data={data}
          />
        </PaperWithHeader>
      </Grid>
    </Grid>
  );
};

export default Charts;
