import { useSubscription } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { FC, useMemo } from 'react';
import BarChart from '../../components/charts/BarChart/BarChart';
import { LISTEN_FOR_EXTRINSICS_TIMESTAMPS } from '../../schemas/extrinsics.schema';

// const extrinsinctCountIn72Hours = 4320;
// const HOUR = 60 * 60 * 1000;

// function buildExtrinsicsTimestamps() {
//   const date = dayjs();
//   const timestamps = Array.from(Array(extrinsinctCountIn72Hours).keys()).map(() =>
//     Math.floor(date.unix() * 1000 - Math.random() * (48 * HOUR))
//   );
//   timestamps.sort();
//   return timestamps;
// }

type Response = {
  extrinsic: { timestamp: number }[];
};

const HistoryChart: FC = () => {
  const variables = useMemo(() => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);
    return {
      orderBy: [{ timestamp: 'asc' }],
      where: { timestamp: { _gte: twoDaysAgo.getTime() } }
    };
  }, []);
  const { data, loading } = useSubscription<Response>(LISTEN_FOR_EXTRINSICS_TIMESTAMPS, {
    variables
  });
  const timestamps = useMemo(
    () => (data?.extrinsic || []).map(({ timestamp }) => timestamp),
    [data?.extrinsic]
  );
  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
      <BarChart series={{ timestamps, label: 'Extrinsic' }} />
    </Box>
  );
};

export default HistoryChart;
