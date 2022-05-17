import { styled, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AverageAnnualReturn from '../../components/charts/AverageAnnualReturnLineChart';
import NewAccounts from '../../components/charts/NewAccountsLineChart';
import StakingRatio from '../../components/charts/StakingRatioLineChart';
import StakingSupplyChart from '../../components/charts/StakingSupplyDoughnutChart';
import TotalIssuance from '../../components/charts/TotalIssuanceDoughnutChart';
import TransactionsChart from '../../components/charts/TransactionsLineChart';
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
          <Box>
            <LatestBlocks />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Transfers />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <TransactionsChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <NewAccounts />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <StakingRatio />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrap>
            <AverageAnnualReturn />
          </ChartWrap>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenStatus;
