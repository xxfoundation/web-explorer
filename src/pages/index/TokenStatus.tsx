import { styled, Box, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import {
  TransactionsChart,
  NewAccountsChart,
  StakingRatioChart,
  StakingInterestChart,
  TotalIssuanceDonutChart,
  StakingSupplyDonutChart
} from '../../components/charts';
import LatestBlocks from '../../components/blockchain/LatestBlocksList';
import TransfersTable from '../../components/blockchain/LatestTransfersList';
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
    <AspectBox ratio={2 / 1}>
      {children}
    </AspectBox>
  </ChartWrapContainer>
)

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
          <LatestBlocks />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransfersTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrap>
            <TransactionsChart />
          </PaperWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrap>
            <NewAccountsChart />
          </PaperWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrap>
            <StakingRatioChart />
          </PaperWrap>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrap>
            <StakingInterestChart />
          </PaperWrap>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenStatus;
