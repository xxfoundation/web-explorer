import type { GetStakingStats } from '../../../schemas/staking.schema';
import { useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';

import { GET_STAKING_STATS } from '../../../schemas/staking.schema';
import Loading from '../../Loading';
import LineChart from './LineChart';
import { DataPoint } from './types';
import Error from '../../Error';
import DefaultTile from '../../DefaultTile';
import { amountByEraTooltip } from './formatters';

export type Props = {
  limit?: number;
  offset?: number;
};

const AveragePointsLineChart: FC<Props> = ({ limit = 30, offset = 0 }) => {
  const pointsQuery = useQuery<GetStakingStats>(GET_STAKING_STATS, {
    variables: { limit: limit, offset: offset }
  });
  const data = useMemo(
    () => pointsQuery.data?.stats.map((s) => [s.era, s.pointsAvg] as DataPoint),
    [pointsQuery.data]
  );

  if (pointsQuery.loading) {
    return <Loading />;
  }

  if (pointsQuery.error || !data) {
    return <Error />;
  }

  return (
    <DefaultTile header='Average era points'>
      <LineChart tooltipFormatter={amountByEraTooltip} data={data} />
    </DefaultTile>
  );
};

export default AveragePointsLineChart;
