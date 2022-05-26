import { styled, Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import HoldersTable from './HoldersTable';
import Summary from './Summary';
import { TotalIssuanceDoughnutChart, StakingSupplyDoughnutChart } from '../../components/charts';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';

const ChartWrap = styled(PaperWrapStyled)({
  height: '16rem',
  display: 'flex'
});

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
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <TotalIssuanceDoughnutChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <StakingSupplyDoughnutChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={12}>
          <HoldersTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
