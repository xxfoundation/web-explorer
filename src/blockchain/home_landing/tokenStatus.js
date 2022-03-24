import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import AverageAnnualReturn from '../components/averageAnnualReturn';
import LatestBlock from '../components/latestBlock';
import NewAccounts from '../components/newAccounts';
import StakingRatio from '../components/stakingRatio';
import StakingSupply from '../components/stakingSupply';
import TotalIssuance from '../components/totalIssuance';
import TransactionsChart from '../components/transactions';
import Transferences from '../components/transfers';

const TokenStatus = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h3" gutterBottom>
        Token Status
      </Typography>
      <Grid container spacing={2}>
        {[
          <TotalIssuance key="totalIssuance" />,
          <StakingSupply key="stakingSupply" />,
          <LatestBlock key="latestBlock" />,
          <Transferences key="transferences" />,
          <TransactionsChart key="transactionsChart" />,
          <NewAccounts key="newAccounts" />,
          <StakingRatio key="stakingRatio" />,
          <AverageAnnualReturn key="averageAnnualReturn" />
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
