import { styled, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AverageAnnualReturn from '../../components/charts/AverageAnnualReturnLineChart';
import NewAccounts from '../../components/charts/NewAccountsLineChart';
import StakingRatio from '../../components/charts/highcharts/StakingRatioLineChart';
import TransactionsChart from '../../components/charts/highcharts/TransactionsLineChart';
import LatestBlocks from '../../components/blockchain/LatestBlocksList';
import TransfersTable from '../../components/blockchain/LatestTransfersList';
import StakingSupplyChart from '../../components/charts/StakingSupplyDoughnutChart';
import TotalIssuance from '../../components/charts/TotalIssuanceDoughnutChart';
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
          <ChartWrap >
            <StakingSupplyChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <LatestBlocks />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransfersTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <TransactionsChart />
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <NewAccounts />
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <StakingRatio />
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled>
            <AverageAnnualReturn />
          </PaperWrapStyled>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenStatus;
