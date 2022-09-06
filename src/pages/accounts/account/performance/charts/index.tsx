import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { Account } from '../../../../../schemas/accounts.schema';
import Commission from './Commission';
import ElectedSelfStake from './ElectedSelfStake';
import EraPoints from './EraPoints';
import RelativePerformance from './RelativePerformance';

const Charts: FC<{
  account: Account;
}> = ({ account }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <RelativePerformance stashAddress={account.id} />
      </Grid>
      <Grid item xs={12} md={6}>
        <EraPoints stashAddress={account.id} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Commission stashAddress={account.id} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ElectedSelfStake stashAddress={account.id} />
      </Grid>
    </Grid>
  );
};

export default Charts;
