import { Grid } from '@mui/material';
import React, { FC } from 'react';
import Commission from './Commission';
import ElectedSelfStake from './ElectedSelfStake';
import EraPoints from './EraPoints';
import RelativePerformance from './RelativePerformance';

const Charts: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <RelativePerformance />
      </Grid>
      <Grid item xs={12} md={6}>
        <EraPoints />
      </Grid>
      <Grid item xs={12} md={6}>
        <Commission />
      </Grid>
      <Grid item xs={12} md={6}>
        <ElectedSelfStake />
      </Grid>
    </Grid>
  );
};

export default Charts;
