import { useSubscription } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useMemo } from 'react';
import BarChart from '../../components/charts/BarChart/BarChart';
import { LISTEN_FOR_EXTRINSIC_HISTORY } from '../../schemas/extrinsics.schema';

const extrinsinctCountIn72Hours = 4320;
const HOUR = 60 * 60 * 1000;

function buildExtrinsicsTimestamps() {
  const date = dayjs();
  const timestamps = Array.from(Array(extrinsinctCountIn72Hours).keys()).map(() =>
    Math.floor(date.unix() * 1000 - Math.random() * (48 * HOUR))
  );
  timestamps.sort();
  return timestamps;
}

const HistoryChart: FC = () => {
  const { loading } = useSubscription<{
    extrinsicsByHour: { extrinsics: number; timestamp: string }[];
  }>(LISTEN_FOR_EXTRINSIC_HISTORY);
  const timestamps = useMemo(() => buildExtrinsicsTimestamps(), []);
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
