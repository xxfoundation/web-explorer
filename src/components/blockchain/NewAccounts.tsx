import { gql, useSubscription } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import { LineChart } from '../charts/highcharts';

const ON_NEW_ACCOUNTS = gql`
  subscription OnNewAccounts {
    newAccounts
  }
`;

const NewAccounts = () => {
  const { data, error, loading } = useSubscription(ON_NEW_ACCOUNTS);
  if (loading) return <Typography>loading new accounts chart</Typography>;
  if (error) {
    console.error(error);
    return <Typography>error loading new accounts</Typography>;
  }
  const sortedAccounts = data.newAccounts.sort((a: number[], b: number[]) => a[0] - b[0]);

  return (
    <>
      <LineChart
        title="NEW ACCOUNTS high"
        data={loading ? [] : sortedAccounts}
      />
    </>
  );
};

export default NewAccounts;
