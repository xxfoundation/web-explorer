import type { GetStakingStats } from '../../../schemas/staking.schema';
import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';

import { amountByEraTooltip, balanceLabelFormatter } from './formatters'
import { GET_STAKING_STATS } from '../../../schemas/staking.schema';
import Loading from '../../Loading';
import LineChart from './LineChart';
import { DataPoint } from './types';
import Error from '../../Error';
import DefaultTile from '../../DefaultTile';

const variables = { limit: 10, offset: 0 }

const AverageSelfStakeLineChart = () => {
  const pointsQuery = useQuery<GetStakingStats>(GET_STAKING_STATS, { variables });
  const data = useMemo(
    () => pointsQuery.data?.stats.map((s) => [s.era, s.selfStakeAvg] as DataPoint),
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
    <DefaultTile header='Average self stake' >
      <LineChart
        labelFormatters={{ yAxis: balanceLabelFormatter }}
        tooltipFormatter={amountByEraTooltip}
        data={data} />
    </DefaultTile>
  )
}

export default AverageSelfStakeLineChart;
