import { useSubscription } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
// import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import BarChart from '../../components/charts/BarChart/BarChart';
import IntervalControls, {
  intervalToTimestamp
} from '../../components/charts/BarChart/IntervalControls';
import { TimeInterval } from '../../components/charts/BarChart/types';
import { LISTEN_FOR_TRANSFERS_TIMESTAMPS } from '../../schemas/transfers.schema';

const TranfersChart: FC = () => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'asc' }],
      where: { timestamp: { _gte: intervalToTimestamp(interval) } }
    };
  }, [interval]);
  const { data, loading } = useSubscription<{ transfer: { timestamp: number }[] }>(
    LISTEN_FOR_TRANSFERS_TIMESTAMPS,
    { variables }
  );
  return (
    <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
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
          {loading ? <CircularProgress /> : <Typography>no transfers in this range</Typography>}
        </Box>
      ) : (
        <BarChart
          series={{
            timestamps: (data?.transfer || []).map(({ timestamp }) => timestamp),
            label: 'transfers'
          }}
          interval={interval}
        />
      )}
    </Box>
  );
};

export default TranfersChart;
