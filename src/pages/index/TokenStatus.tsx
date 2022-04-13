import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AverageAnnualReturn from '../../components/blockchain/AverageAnnualReturn';
import LatestBlocks from '../../components/blockchain/LatestBlocks';
import NewAccounts from '../../components/blockchain/NewAccounts';
import StakingRatio from '../../components/blockchain/StakingRatio';
import StakingSupplyChart from '../../components/blockchain/StakingSupplyChart';
import TotalIssuance from '../../components/blockchain/TotalIssuance';
import TransactionsChart from '../../components/blockchain/Transactions';
import Transfers from '../../components/blockchain/Transfers';

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
