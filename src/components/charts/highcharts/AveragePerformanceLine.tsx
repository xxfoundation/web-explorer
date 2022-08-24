import type { GetStakingStats } from '../../../schemas/staking.schema';
import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';

import { GET_STAKING_STATS } from '../../../schemas/staking.schema';
import Loading from '../../Loading';
import LineChart from './LineChart';
import { DataPoint } from './types';
import Error from '../../Error';
import DefaultTile from '../../DefaultTile';

const variables = { limit: 10, offset: 0 }

const AveragePerformanceLineChart = () => {
  const pointsQuery = useQuery<GetStakingStats>(GET_STAKING_STATS, { variables });
  const data = useMemo(
    () => pointsQuery.data?.stats.map((s) => [s.era, s.pointsTotal / s.pointsMax] as DataPoint),
    [pointsQuery.data]
  );

  if (pointsQuery.loading) {
    return (
      <Loading />
    )
  }

  if (pointsQuery.error || !data) {
    return (
      <Error />
    )
  }

  return (
    <DefaultTile header='Average performance' >
      <LineChart data={data} />
    </DefaultTile>
  )
}

export default AveragePerformanceLineChart;


