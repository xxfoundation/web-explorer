import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import AverageAnnualReturn from '../../components/blockchain/AverageAnnualReturn';
import LatestBlock from '../../components/blockchain/LatestBlock';
import NewAccounts from '../../components/blockchain/NewAccounts';
import StakingRatio from '../../components/blockchain/StakingRatio';
import StakingSupplyChart from '../../components/blockchain/StakingSupplyChart';
import TotalIssuance from '../../components/blockchain/TotalIssuance';
import TransactionsChart from '../../components/blockchain/Transactions';
import Transferences from '../../components/blockchain/Transfers';

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
          <LatestBlock key='latestBlock' />,
          <Transferences key='transferences' />,
          <TransactionsChart key='transactionsChart' />,
          <NewAccounts key='newAccounts' />,
          <StakingRatio key='stakingRatio' />,
          <AverageAnnualReturn key='averageAnnualReturn' />
        ].map((item, i) => {
          return (
            <Grid item xs={12} md={6} key={i}>
              <Card>{item}</Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TokenStatus;
