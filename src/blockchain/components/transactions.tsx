import { gql, useSubscription } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import * as Highcharts from '../../charts/highcharts';
import * as ECharts from '../../charts/echarts';

import { DataPoint } from '../../types';

const ON_TRANSACTION_EVENT = gql`
  subscription OnTrasactionEvent {
    transactions
  }
`;

const sortTransactions = ({ transactions }: { transactions: DataPoint[] } ) => {
  return transactions.sort((a, b) => {
    return a[0] - b[0];
  });
};

const TransactionsChart = () => {
  const { data, error, loading } = useSubscription(ON_TRANSACTION_EVENT);
  if (loading) return <Typography>loading charts</Typography>;
  if (error) {
    console.error(error);
    return <Typography>error loading the charts</Typography>;
  }

  const sortedTransactions = sortTransactions(data);

  return (
    <>
      <Highcharts.LineChart
        title="transactions high"
        data={loading ? [] : sortedTransactions}
      />
      <ECharts.LineChart title="transactions E" data={sortedTransactions} />
    </>
  );
};

export default TransactionsChart;
