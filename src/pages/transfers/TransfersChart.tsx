import type { SeriesData, TimeInterval } from '../../components/charts/BarChart/types';

import { useQuery } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
// import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import BarChart from '../../components/charts/BarChart/BarChart';
import IntervalControls, {
  intervalToTimestamp
} from '../../components/charts/BarChart/IntervalControls';
import Error from '../../components/Error';
import { GET_TRANSFERS_TIMESTAMPS } from '../../schemas/transfers.schema';

const TranfersChart: FC = () => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'asc' }],
      where: { timestamp: { _gte: intervalToTimestamp(interval) } }
    };
  }, [interval]);
  const { data, loading } = useQuery<{ transfer: { timestamp: number; amount: number }[] }>(
    GET_TRANSFERS_TIMESTAMPS,
    { variables }
  );

  const series = useMemo<[SeriesData, SeriesData]>(
    () => [
      {
        timestamps: (data?.transfer || []).map((t) => t.timestamp),
        magnitudes: (data?.transfer || []).map((t) => t.amount),
        isCurrency: true,
        label: 'xx'
      },
      {
        timestamps: (data?.transfer || []).map((t) => t.timestamp),
        label: 'transfers'
      }
    ],
    [data?.transfer]
  );

  return (
    <Box
      style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollBehavior: 'smooth'
      }}
    >
      <IntervalControls interval={interval} setInterval={setInterval} loading={loading} />
      {loading || !(data?.transfer || []).length ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px'
          }}
        >
          {loading ? <CircularProgress /> : <Error type='data-unavailable' />}
        </Box>
      ) : (
        <BarChart series={series} interval={interval} />
      )}
    </Box>
  );
};

export default TranfersChart;
