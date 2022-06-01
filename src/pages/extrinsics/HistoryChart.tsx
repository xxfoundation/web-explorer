import { useSubscription } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import BarChart from '../../components/charts/BarChart/BarChart';
import IntervalControls from '../../components/charts/BarChart/IntervalControls';
import { TimeInterval } from '../../components/charts/BarChart/types';
import { LISTEN_FOR_EXTRINSICS_TIMESTAMPS } from '../../schemas/extrinsics.schema';

type Response = {
  extrinsic: { timestamp: number }[];
};

const defineMinTimestamp = (interval: TimeInterval) => {
  const minRange = new Date();
  if (interval === '1h') {
    minRange.setHours(minRange.getHours() - 48);
  }
  if (interval === '6h') {
    minRange.setHours(minRange.getHours() - 24 * 10);
  }
  if (interval === '1d') {
    minRange.setMonth(minRange.getMonth() - 1);
    minRange.setHours(0, 0, 0, 0);
  }
  return minRange.getTime();
};

const HistoryChart: FC = () => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'asc' }],
      where: { timestamp: { _gte: defineMinTimestamp(interval) } }
    };
  }, [interval]);
  const { data, loading } = useSubscription<Response>(LISTEN_FOR_EXTRINSICS_TIMESTAMPS, {
    variables
  });
  const timestamps = useMemo(
    () => (data?.extrinsic || []).map(({ timestamp }) => timestamp),
    [data?.extrinsic]
  );
  return (
    <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
      <IntervalControls interval={interval} setInterval={setInterval} loading={loading} />
      {loading ? (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <BarChart series={{ timestamps, label: 'Extrinsic' }} interval={interval} />
      )}
    </Box>
  );
};

export default HistoryChart;
