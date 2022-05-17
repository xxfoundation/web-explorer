import React from 'react';
import { Line }  from 'react-chartjs-2';
import { Stack, Typography } from '@mui/material';

const data = {
  labels: [321, 320, 319, 318],
  datasets: [{
    data: [147, 238, 212, 68]
  }],
};

const TransactionsChart = () => (
  <Stack spacing={4} sx={{ width: '100%' }}>
    <Typography variant='h3'>Transactions</Typography>
    <Line style={{ flexGrow: 1 }} data={data} />
  </Stack>
)

export default TransactionsChart;
