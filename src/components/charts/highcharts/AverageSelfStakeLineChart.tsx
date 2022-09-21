import type { GetStakingStats } from '../../../schemas/staking.schema';
import { useQuery } from '@apollo/client';
import React, { FC, useMemo, useState } from 'react';
import { Box } from '@mui/material';

import { balanceByEraTooltip, balanceLabelFormatter } from './formatters';
import { GET_STAKING_STATS } from '../../../schemas/staking.schema';
import Loading from '../../Loading';
import LineChart from './LineChart';
import { DataPoint } from './types';
import Error from '../../Error';
import TimeframesDropdown from '../../TimeframesDropdown';

const AverageSelfStakeLineChart: FC = () => {
  const [timeframe, setTimeframe] = useState<number>();
  const pointsQuery = useQuery<GetStakingStats>(GET_STAKING_STATS, {
    variables: { limit: timeframe || undefined }
  });

  const data = useMemo(
    () => pointsQuery.data?.stats
      .map((s) => [s.era, s.selfStakeAvg] as DataPoint),
    [pointsQuery.data]
  );

  if (pointsQuery.loading) {
    return <Loading />;
  }

  if (pointsQuery.error || !data) {
    return <Error />;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right', pr: 2 }}>
        <TimeframesDropdown value={timeframe} onChange={setTimeframe} />
      </Box>
      <LineChart
        labelFormatters={{ yAxis: balanceLabelFormatter }}
        tooltipFormatter={balanceByEraTooltip}
        data={data}
      />
    </>
  );
};

export default AverageSelfStakeLineChart;
