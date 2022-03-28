import { gql, useSubscription } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import LineChart from '../charts/highcharts/LineChart';
import { formatPercent, tooltipFormatter } from './formatters';

const ON_STAKING_RATIO_CHANGE = gql`
  subscription OnStakingRatioChange {
    stakingRatio
  }
`;

const StakingRatio = () => {
  const { data, error, loading } = useSubscription(ON_STAKING_RATIO_CHANGE);
  if (loading) return <Typography>loading staking ratio chart</Typography>;
  if (error) {
    console.error(error);
    return <Typography>error loading staking ratio</Typography>;
  }
  const sortedAccounts = data.stakingRatio.sort((a: number[], b: number[]) => a[0] - b[0]);
  return (
    <>
      <LineChart
        title='staking ratio'
        data={loading ? [] : sortedAccounts}
        tooltipFormatter={tooltipFormatter}
        labelFormatters={{
          yAxis: formatPercent
        }}
      />
    </>
  );
};

export default StakingRatio;
