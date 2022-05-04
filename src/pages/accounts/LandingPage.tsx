import { Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import HoldersTable from './HolderTable';
import NetworkInformation from './NetworkInformation';
import StakingSupply from './StakingSupply';
import TotalIssuance from './TotalIssuance';

const LandingPage: FC = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h1'>Accounts</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <NetworkInformation />
        </Grid>
        <Grid item xs={12} md={6}>
          <TotalIssuance />
        </Grid>
        <Grid item xs={12} md={6}>
          <StakingSupply />
        </Grid>
        <Grid item xs={12} md={12}>
          <HoldersTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
