import { styled, Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import NewAccounts from '../../components/charts/NewAccountsLineChart';
import HoldersTable from './HoldersTable';
import Summary from './Summary';

const LandingPage: FC = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h1' sx={{ mb: 5 }}>
        Accounts
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Summary />
        </Grid>
        <Grid item xs={12}>
          <NewAccounts />
        </Grid>
        <Grid item xs={12} md={12}>
          <HoldersTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
