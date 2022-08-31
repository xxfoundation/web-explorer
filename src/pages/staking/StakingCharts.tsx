import React from 'react';
import { Grid, Typography } from '@mui/material';

import AveragePointsLineChart from '../../components/charts/highcharts/PointAverageLineChart';
import AveragePerformanceLineChart from '../../components/charts/highcharts/AveragePerformanceLine';
import AverageSelfStakeLineChart from '../../components/charts/highcharts/AverageSelfStakeLineChart';
import AverageCommissionLineChart from '../../components/charts/highcharts/AverageCommissionLineChart';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';

const headerSx = { mt: { xs: 2, sm: 0 }, mb: 4 };

const StakingCharts = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <PaperWrapStyled>
          <Typography variant='h3' sx={headerSx} gutterBottom>
            Average Points
          </Typography>
          <AveragePointsLineChart />
        </PaperWrapStyled>
      </Grid>
      <Grid item xs={12} md={6}>
        <PaperWrapStyled>
          <Typography variant='h3' sx={headerSx} gutterBottom>
            Average Performance
          </Typography>
          <AveragePerformanceLineChart />
        </PaperWrapStyled>
      </Grid>
      <Grid item xs={12} md={6}>
        <PaperWrapStyled>
          <Typography variant='h3' sx={headerSx} gutterBottom>
            Average Self Stake
          </Typography>
          <AverageSelfStakeLineChart />
        </PaperWrapStyled>
      </Grid>
      <Grid item xs={12} md={6}>
        <PaperWrapStyled>
          <Typography variant='h3'sx={headerSx} gutterBottom>
            Average Commission
          </Typography>
          <AverageCommissionLineChart />
        </PaperWrapStyled>
      </Grid>
    </Grid>
  );
};

export default StakingCharts;
