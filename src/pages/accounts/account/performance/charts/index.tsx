import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import React, { FC } from 'react';

import Loading from '../../../../../components/Loading';
import Error from '../../../../../components/Error';
import { Account } from '../../../../../schemas/accounts.schema';
import { GetValidatorStats, GET_VALIDATOR_STATS } from '../../../../../schemas/staking.schema';
import Commission from './Commission';
import ElectedSelfStake from './ElectedSelfStake';
import EraPoints from './EraPoints';
import RelativePerformance from './RelativePerformance';

const Charts: FC<{ account: Account }> = ({ account }) => {
  const stats = useQuery<GetValidatorStats>(GET_VALIDATOR_STATS, { variables: {
    accountId: account.id
  }});

  if (stats.loading) { return <Loading size='lg' /> }
  if (stats.error || !stats.data) { return <Error /> }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <RelativePerformance stats={stats.data.stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <EraPoints stats={stats.data.stats}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Commission stats={stats.data.stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ElectedSelfStake stats={stats.data.stats} />
      </Grid>
    </Grid>
  );
};

export default Charts;
