import { DocumentNode, useQuery } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import BarChart from '../../components/charts/BarChart/BarChart';
import IntervalControls, {
  intervalToTimestamp
} from '../../components/charts/BarChart/IntervalControls';
import { TimeInterval } from '../../components/charts/BarChart/types';
import Error from '../../components/Error';
import {
  GetExtrinsicCounts,
  GET_DAILY_EXTRINSIC_COUNTS,
  GET_HOURLY_EXTRINSIC_COUNTS,
  GET_SIX_HOUR_EXTRINSIC_COUNTS
} from '../../schemas/extrinsics.schema';

const intervalQueryMap: Record<TimeInterval, DocumentNode> = {
  '1d': GET_DAILY_EXTRINSIC_COUNTS,
  '6h': GET_SIX_HOUR_EXTRINSIC_COUNTS,
  '1h': GET_HOURLY_EXTRINSIC_COUNTS
};

const ExtrinsicsBatChart: FC = () => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'desc' }],
      where: { timestamp: { _gte: intervalToTimestamp(interval) } }
    };
  }, [interval]);

  const { data, error, loading } = useQuery<GetExtrinsicCounts>(intervalQueryMap[interval], {
    variables
  });

  const counts = useMemo<[string, number][] | undefined>(
    () => data?.counts.map((d) => [d.timestamp, d.count]),
    [data]
  );

  return (
    <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
      <IntervalControls interval={interval} setInterval={setInterval} loading={loading} />
      {loading || error || counts?.length === 0 ? (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}
        >
          {(error || counts?.length === 0) && <Error />}
          {loading && <CircularProgress />}
        </Box>
      ) : (
        <BarChart series={{ data: counts, label: 'Extrinsic' }} interval={interval} />
      )}
    </Box>
  );
};

export default ExtrinsicsBatChart;
