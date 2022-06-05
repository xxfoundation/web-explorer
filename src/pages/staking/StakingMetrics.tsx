import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Box, Divider, Stack, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';
import StakingSupplyDonutChart from '../../components/charts/StakingSupplyDonutChart';
import { useSubscription } from '@apollo/client';
import { Economics, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Loading from '../../components/Loading';

const dividerMargins = { ml: 3, mr: 3, mt: 0, mb: 0 };

const ERA_HOUR = 7;

const extractMetrics = (economics?: Economics) => {
  const now = dayjs().utc();
  const hour = now.hour() + (now.minute() / 60);
  const hoursRemaining = hour > ERA_HOUR ? hour -ERA_HOUR : hour + 24 - ERA_HOUR;
  const era = economics?.activeEra;
  const eraProgress = hoursRemaining / 24 * 100;
  const epoch = Math.floor(hoursRemaining / 8) + 1;
  const epochProgress = ((hoursRemaining % 8) / 8) * 100;

  return {
    era,
    eraProgress,
    epoch,
    epochProgress
  }
};

const StakingMetrics = () => {
  const subscription = useSubscription<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = subscription.data?.economics[0];
  const loading = subscription.loading;

  const metrics = useMemo(
    () => extractMetrics(economics),
    [economics]
  );
  
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Stack direction={{ xs: 'row', md: 'column' }} sx={{ justifyContent: 'space-between' }}>
        <Loading loading={loading}>
          <Box>
            <Typography variant='h6'>Average Return</Typography>
            <Typography variant='h3'>40.90%</Typography>
          </Box>
          <Box>
            <Typography variant='h6'>Inflation Rate</Typography>
            <Typography variant='h3'>{economics?.inflationRate}%</Typography>
          </Box>
        </Loading>
      </Stack>
      <Divider sx={dividerMargins} orientation='vertical' variant='middle' flexItem />
      <Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <Loading loading={loading}>
          <Box sx={{ mb: 2 }}>
            <Stack direction='row' sx={{ mb: 1 }} style={{ justifyContent: 'space-between' }}>
              <Typography variant='h6'>ERA #{metrics.era}</Typography>
            </Stack>
            <ProgressBar value={metrics?.eraProgress} variant='determinate' />
          </Box>
          <Box>
            <Stack direction='row' sx={{ mb: 1 }} style={{ justifyContent: 'space-between' }}>
              <Typography variant='h6'>EPOCH #{metrics.era}-{metrics.epoch}</Typography>
            </Stack>
            <ProgressBar value={metrics.epochProgress} variant='determinate' />
          </Box>
        </Loading>
      </Stack>
      <Divider sx={dividerMargins} orientation='vertical' variant='middle' flexItem />
      <Box sx={{ position: 'relative' }}>
        <StakingSupplyDonutChart />
      </Box>
    </Stack>
  )
};

export default StakingMetrics;
