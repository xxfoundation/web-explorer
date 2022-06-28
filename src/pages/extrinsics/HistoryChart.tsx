import { useSubscription } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import BarChart from '../../components/charts/BarChart/BarChart';
import IntervalControls, {
  intervalToTimestamp
} from '../../components/charts/BarChart/IntervalControls';
import { TimeInterval } from '../../components/charts/BarChart/types';
import { LISTEN_FOR_EXTRINSICS_TIMESTAMPS } from '../../schemas/extrinsics.schema';

type Response = {
  extrinsic: { timestamp: number }[];
};

const HistoryChart: FC = () => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'desc' }],
      where: { timestamp: { _gte: intervalToTimestamp(interval) } }
    };
  }, [interval]);
  const { data, loading } = useSubscription<Response>(LISTEN_FOR_EXTRINSICS_TIMESTAMPS, {
    variables
  });
  const timestamps = useMemo(
    () => (data?.extrinsic || []).map(({ timestamp }) => timestamp),
    [data?.extrinsic]
  );

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(variables));

  return (
    <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
      <IntervalControls interval={interval} setInterval={setInterval} loading={loading} />
      {loading || !timestamps.length ? (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}
        >
          {loading ? <CircularProgress /> : <Typography>no extrinsics in this range</Typography>}
        </Box>
      ) : (
        <BarChart series={{ timestamps, label: 'Extrinsic' }} interval={interval} />
      )}
    </Box>
  );
};

export default HistoryChart;
