import { Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';
import HoldersTable from './HolderTable';
import StakingSupply from './StakingSupply';
import TotalIssuance from './TotalIssuance';

const NetworkInfo: FC = () => {
  return (
    <PaperStyled>
      <h1>header</h1>
    </PaperStyled>
  );
};

const LandingPage: FC = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h1'>Accounts</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <NetworkInfo />
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
