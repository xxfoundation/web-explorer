import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';
import StakingSupplyDonutChart from '../../components/charts/StakingSupplyDonutChart';
import { useQuery } from '@apollo/client';
import { Economics, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Loading from '../../components/Loading';
import { BN, BN_MILLION } from '@polkadot/util';
import { stripNonDigits } from '../../utils';

const dividerMargins = { ml: 3, mr: 3, mt: 0, mb: 0 };

const ERA_HOUR = 7; // Era starts everyday at 7am UTC

const extractMetrics = (economics?: Economics) => {
  const now = dayjs().utc();
  const hour = now.hour() + now.minute() / 60;
  const hoursRemaining = hour > ERA_HOUR ? hour - ERA_HOUR : hour + 24 - ERA_HOUR;
  const era = economics?.activeEra;
  const eraProgress = (hoursRemaining / 24) * 100;
  const epoch = Math.floor(hoursRemaining / 8) + 1;
  const epochProgress = ((hoursRemaining % 8) / 8) * 100;

  return {
    era,
    eraProgress,
    epoch,
    epochProgress
  };
};

export const getStakedReturn = (economics: Economics): number => {
  const totalStaked = new BN(stripNonDigits(economics?.staked));
  const tmStaked = new BN(stripNonDigits(economics?.tmStaked));
  const stakeableSupply = new BN(stripNonDigits(economics?.stakeableSupply));
  const inflationRate = new BN(stripNonDigits(economics?.inflationRate)).toNumber();
  const stakedFraction =
    totalStaked.mul(BN_MILLION).div(stakeableSupply).toNumber() / BN_MILLION.toNumber();
  const multiplierImpact = totalStaked.mul(BN_MILLION).div(totalStaked.add(tmStaked)).toNumber() / 1e6;
  return stakedFraction ? inflationRate * multiplierImpact / stakedFraction / 100 : 0;
};

const StakingMetrics = () => {
  const query = useQuery<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = query.data?.economics[0];
  const loading = query.loading;

  const metrics = useMemo(() => extractMetrics(economics), [economics]);
  const avgStakedReturn = economics ? getStakedReturn(economics).toFixed(2) : 'N/D';

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Stack direction={{ xs: 'row', md: 'column' }} sx={{ justifyContent: 'space-between' }}>
        <Loading loading={loading}>
          <Box>
            <Typography variant='h6'>Average Return</Typography>
            <Tooltip
              title='Network overall staking return. Calculated from the current staked ratio, current ideal interest and inflation parameters.'
              arrow
            >
              <Typography variant='h3'>{avgStakedReturn}%</Typography>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant='h6'>Circulating AGR</Typography>
            <Tooltip
              title='Defined by the Annual Growth Rate of the circulating supply given by the distribution of staking rewards.'
              arrow
            >
              <Typography variant='h3'>{economics?.inflationRate}%</Typography>
            </Tooltip>
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
              <Tooltip
                title='An Era (24h) is composed by 3 Epochs (8h). An Epoch sets the periods where important actions can take place on chain during an era, like the election of the next validator set which starts before the last epoch.'
                arrow
              >
                <Typography variant='h6'>
                  EPOCH #{metrics.era}-{metrics.epoch}
                </Typography>
              </Tooltip>
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
  );
};

export default StakingMetrics;
