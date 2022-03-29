import React from 'react';
import * as Highcharts from '../../charts/highcharts';
import { DataPoint } from '../../types';


const data: {transactions: DataPoint[]} = {transactions: [[1876,6897], [8968,101], [67761,613]]}

const sortTransactions = ({ transactions }: { transactions: DataPoint[] } ) => {
  return transactions.sort((a, b) => {
    return a[0] - b[0];
  });
};

const TransactionsChart = () => {
  const sortedTransactions = sortTransactions(data);

  return (
    <>
      <Highcharts.LineChart
        title='transactions high'
        data={sortedTransactions}
      />
    </>
  );
};

export default TransactionsChart;
