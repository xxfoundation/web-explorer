import React from 'react';
import { Grid } from '@mui/material';

import AveragePointsLineChart from '../../components/charts/highcharts/PointAverageLineChart';
import AveragePerformanceLineChart from '../../components/charts/highcharts/AveragePerformanceLine';
import AverageSelfStakeLineChart from '../../components/charts/highcharts/AverageSelfStakeLineChart';
import AverageCommissionLineChart from '../../components/charts/highcharts/AverageCommissionLineChart';

const StakingStats = () => {
  return (
    <Grid container spacing={2}>
      <Grid md={6} sm={12} item>
        <AverageCommissionLineChart />
      </Grid>
      <Grid md={6} sm={12} item>
        <AverageSelfStakeLineChart />
      </Grid>
      <Grid md={6} sm={12} item>
        <AveragePerformanceLineChart />
      </Grid>
      <Grid md={6} sm={12} item>
        <AveragePointsLineChart />
      </Grid>
    </Grid>
  )
}

export default StakingStats;
