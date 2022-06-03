import { styled, Box, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import LatestBlocksList from '../../components/blockchain/LatestBlocksList';
import LatestTransfersList from '../../components/blockchain/LatestTransfersList';
import {
  NewAccountsChart,
  StakingSupplyDonutChart,
  TotalIssuanceDonutChart,
  TransactionsChart
} from '../../components/charts';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import AspectBox from '../../components/AspectBox';

const ChartWrapContainer = styled(PaperWrap)(({ theme }) => ({
  minHeight: '10rem',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

const ChartWrap: FC = ({ children }) => (
  <ChartWrapContainer>
    <AspectBox ratio={2 / 1}>{children}</AspectBox>
  </ChartWrapContainer>
);

const TokenStatus = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h3' gutterBottom>
        Token Status
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <ChartWrap>
            <TotalIssuanceDonutChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <ChartWrap>
            <StakingSupplyDonutChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <LatestBlocksList />
        </Grid>
        <Grid item xs={12} md={6}>
          <LatestTransfersList />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <NewAccountsChart />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <StakingRatioChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <StakingInterestChart />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default TokenStatus;
