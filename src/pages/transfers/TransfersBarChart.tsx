import type { SeriesData, TimeInterval } from '../../components/charts/BarChart/types';

import { useQuery } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BarChart from '../../components/charts/BarChart/BarChart';
import { convertTimestamps } from '../../components/charts/BarChart/utils';
import IntervalControls, {
  intervalToTimestamp
} from '../../components/charts/BarChart/IntervalControls';
import Error from '../../components/Error';
import { GET_TRANSFERS_TIMESTAMPS } from '../../schemas/transfers.schema';

const TranfersBarChart: FC = () => {
  const { t } = useTranslation();
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'desc' }],
      where: { timestamp: { _gte: intervalToTimestamp(interval) } }
    };
  }, [interval]);
  const { data, loading } = useQuery<{ transfer: { timestamp: number; amount: number }[] }>(
    GET_TRANSFERS_TIMESTAMPS,
    { variables }
  );

  const amounts = useMemo(
    () =>
      convertTimestamps(
        (data?.transfer || []).map((tx) => tx.timestamp),
        interval,
        (data?.transfer || []).map((tx) => tx.amount)
      ),
    [data?.transfer, interval]
  );

  const counts = useMemo(
    () =>
      convertTimestamps(
        (data?.transfer || []).map((tx) => tx.timestamp),
        interval
      ),
    [data?.transfer, interval]
  );

  const series = useMemo<[SeriesData, SeriesData]>(
    () => [
      {
        data: amounts,
        isCurrency: true,
        label: 'xx'
      },
      {
        timestamps: (data?.transfer || []).map((tx) => tx.timestamp),
        label: 'transfers',
        data: counts
      }
    ],
    [amounts, counts, data?.transfer]
  );

  const errorMessage = useMemo(() => {
    let timeframe;
    if (interval == '1h') {
      timeframe = t('48 hours');
    }

    if (interval == '6h') {
      timeframe = t('10 days')
    }

    if (interval == '1d') {
      timeframe = t('month')
    }

    return t('No transfers made in the past {{timeframe}}', { timeframe });
  }, [t, interval])

 

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
          {loading ? <CircularProgress /> : <Error message={errorMessage}/>}
        </Box>
      ) : (
        <BarChart series={series} interval={interval} />
      )}
    </Box>
  );
};

export default TranfersBarChart;
