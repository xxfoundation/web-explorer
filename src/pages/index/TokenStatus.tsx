import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AverageAnnualReturn from '../../components/blockchain/charts/AverageAnnualReturnLineChart';
import LatestBlocks from '../../components/blockchain/LatestBlocksTable';
import NewAccounts from '../../components/blockchain/charts/NewAccountsLineChart';
import StakingRatio from '../../components/blockchain/charts/StakingRatioLineChart';
import StakingSupplyChart from '../../components/blockchain/charts/StakingSupplyPieChart';
import TotalIssuance from '../../components/blockchain/charts/TotalIssuanceLineChart';
import TransactionsChart from '../../components/blockchain/charts/TransactionsLineChart';
import Transfers from '../../components/blockchain/TransfersTable';

const TokenStatus = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h3' gutterBottom>
        Token Status
      </Typography>
      <Grid container spacing={2}>
        {[
          <TotalIssuance key='totalIssuance' />,
          <StakingSupplyChart key='stakingSupply' />,
          <LatestBlocks key='latestBlock' />,
          <Transfers key='transfers' />,
          <TransactionsChart key='transactionsChart' />,
          <NewAccounts key='newAccounts' />,
          <StakingRatio key='stakingRatio' />,
          <AverageAnnualReturn key='averageAnnualReturn' />
        ].map((item, i) => {
          return (
            <Grid item xs={12} md={6} key={i}>
              <Box>{item}</Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TokenStatus;
