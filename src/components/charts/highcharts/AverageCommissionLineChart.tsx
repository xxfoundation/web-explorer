import type { GetStakingStats } from '../../../schemas/staking.schema';
import { useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';

import { percentLabelFormatter, percentTooltipFormatter } from './formatters';
import { GET_STAKING_STATS } from '../../../schemas/staking.schema';
import Loading from '../../Loading';
import LineChart from './LineChart';
import { DataPoint } from './types';
import Error from '../../Error';

export type Props = {
  limit?: number;
  offset?: number;
};

const AverageCommissionLineChart: FC<Props> = ({ limit = 30, offset = 0 }) => {
  const pointsQuery = useQuery<GetStakingStats>(GET_STAKING_STATS, {
    variables: { limit: limit, offset: offset }
  });
  const data = useMemo(
    () => pointsQuery.data?.stats.map((s) => [s.era, s.commissionAvg / 100] as DataPoint),
    [pointsQuery.data]
  );

  if (pointsQuery.loading) {
    return <Loading />;
  }

  if (pointsQuery.error || !data) {
    return <Error />;
  }

  return (
    <LineChart
      labelFormatters={{ yAxis: percentLabelFormatter }}
      tooltipFormatter={percentTooltipFormatter}
      data={data}
    />
  );
};

export default AverageCommissionLineChart;
