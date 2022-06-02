import { Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import LatestBlocksList from '../../components/blockchain/LatestBlocksList';
import LatestTransfersList from '../../components/blockchain/LatestTransfersList';
import {
  NewAccountsChart,
  // StakingRatioChart,
  // StakingInterestChart,
  StakingSupplyDonutChart,
  TotalIssuanceDonutChart,
  TransactionsChart
} from '../../components/charts';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';

const ChartWrap = styled(PaperWrapStyled)({
  height: '16rem',
  display: 'flex',
  justifyContent: 'stretch'
});

const TokenStatus = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h3' gutterBottom>
        Token Status
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <TotalIssuanceDonutChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
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
          <PaperWrapStyled>
            <TransactionsChart />
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <NewAccountsChart />
          </PaperWrapStyled>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <StakingRatioChart />
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <StakingInterestChart />
          </PaperWrapStyled>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default TokenStatus;
