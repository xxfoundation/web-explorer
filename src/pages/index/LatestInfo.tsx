import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { NewAccountsChart, TransfersLineChart } from '../../components/charts';
import LatestBlocksList from '../../components/blockchain/LatestBlocksList';
import LatestTransfersList from '../../components/blockchain/LatestTransfersList';

const LatestInfo = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant='h3' gutterBottom>
        Latest Updates
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LatestBlocksList />
        </Grid>
        <Grid item xs={12} md={6}>
          <LatestTransfersList />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransfersLineChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <NewAccountsChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LatestInfo;
