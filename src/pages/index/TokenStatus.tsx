import { styled, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import TransactionsChart from '../../components/blockchain/charts/TransactionsLineChart';
import AverageAnnualReturn from '../../components/blockchain/charts/AverageAnnualReturnLineChart';
import NewAccounts from '../../components/blockchain/charts/NewAccountsLineChart';
import StakingRatio from '../../components/blockchain/charts/StakingRatioLineChart';
import StakingSupplyChart from '../../components/charts/StakingSupplyDoughnutChart';
import TotalIssuance from '../../components/charts/TotalIssuanceDoughnutChart';
import LatestBlocks from '../../components/blockchain/LatestBlocksTable';
import Transfers from '../../components/blockchain/TransfersTable';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';

const ChartWrap = styled(PaperWrapStyled)({
  height: '16rem',
  display: 'flex',
  justifyContent: 'stretch',
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
            <TotalIssuance />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <StakingSupplyChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <LatestBlocks />
        </Grid>
        <Grid item xs={12} md={6}>
          <Transfers />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionsChart />
        </Grid>
        <Grid item xs={12} md={6}>
            <NewAccounts />
        </Grid>
        <Grid item xs={12} md={6}>
          <StakingRatio />
        </Grid>
        <Grid item xs={12} md={6}>
          <AverageAnnualReturn />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenStatus;
