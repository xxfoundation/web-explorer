import { gql, useSubscription } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';

import { formatPercent, tooltipFormatter } from './formatters';

import { LineChart } from '../charts/highcharts';
import { DataPoint } from '../../types';


const ON_AVERAGE_ANNUAL_RETURN_UPDATE = gql`
  subscription OnAverageAnnualReturnUpdate {
    averageAnnualReturn
  }
`;

const AverageAnnualReturn = () => {
  const { data, error, loading } = useSubscription(ON_AVERAGE_ANNUAL_RETURN_UPDATE);
  if (loading) return <Typography>loading average annual return chart</Typography>;
  if (error) {
    console.error(error);
    return <Typography>error loading staking ratio</Typography>;
  }
  const sortedAnnualReturn = data.averageAnnualReturn.sort((a: DataPoint, b: DataPoint) => a[0] - b[0]);
  
  return (
    <LineChart
      title='average annual return'
      data={loading ? [] : sortedAnnualReturn}
      tooltipFormatter={tooltipFormatter}
      labelFormatters={{
        yAxis: formatPercent
      }}
    />
  );
};

export default AverageAnnualReturn;
