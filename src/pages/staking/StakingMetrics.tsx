import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { mapValues } from 'lodash';
import { InfoOutlined } from '@mui/icons-material';
import { BN, BN_MILLION } from '@polkadot/util';
import { useQuery } from '@apollo/client';

import ProgressBar from './ProgressBar';
import StakingSupplyDonutChart from '../../components/charts/StakingSupplyDonutChart';

import { Economics, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Loading from '../../components/Loading';
import { stripNonDigits } from '../../utils';
import { CustomTooltip } from '../../components/Tooltip';

const dividerMargins = { ml: 3, mr: 3, mt: 0, mb: 0 };

const ERA_HOUR = 7; // Era starts everyday at 7am UTC

const extractMetrics = (economics?: Economics) => {
  const now = dayjs().utc();
  const hour = now.hour() + now.minute() / 60;
  const hoursRemaining = hour > ERA_HOUR ? hour - ERA_HOUR : hour + 24 - ERA_HOUR;
  const era = economics?.era;
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
  const totalStaked = new BN(stripNonDigits(economics.staked));
  const tmStaked = new BN(stripNonDigits(economics.tmStaked));
  const stakeableSupply = new BN(stripNonDigits(economics.stakeableSupply));
  const inflationRate = +economics?.inflationRate ;
  const stakedFraction =
    totalStaked.mul(BN_MILLION).div(stakeableSupply).toNumber() / BN_MILLION.toNumber();
  const multiplierImpact = totalStaked.mul(BN_MILLION).div(totalStaked.add(tmStaked)).toNumber() / 1e6;
  
  return stakedFraction ? inflationRate * multiplierImpact / stakedFraction : 0;
};

const StakingMetrics = () => {
  const query = useQuery<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = useMemo(() => query.data?.economics[0] && ({
    ...mapValues(
      query.data?.economics[0],
      (v) => v.toString()
    ),
    era: query.data?.economics?.[0]?.era,
  }), [query.data?.economics]);
  const loading = query.loading;

  const metrics = useMemo(() => extractMetrics(economics), [economics]);
  const avgStakedReturn = useMemo(
    () => economics ? getStakedReturn(economics).toFixed(2) : 'N/D',
    [economics]
  );

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Stack direction={{ xs: 'row', md: 'column' }} sx={{ justifyContent: 'space-between' }}>
        <Loading loading={loading}>
          <Box>
            <Typography variant='h6'>Average Return</Typography>
            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
              <Typography variant='h3'>{avgStakedReturn}%</Typography>
              <CustomTooltip
                title='Network overall staking return. Calculated from the current staked ratio, current ideal interest and inflation parameters.'
              >
                <InfoOutlined
                    style={{fontSize: '1em' }}
                  />
              </CustomTooltip>
            </Stack>
          </Box>
          <Box>
            <Typography variant='h6'>Circulating AGR</Typography>
            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
              <Typography variant='h3'>{economics?.inflationRate}%</Typography>
              <CustomTooltip
                title='Defined by the Annual Growth Rate of the circulating supply given by the distribution of staking rewards.'
              >
                <InfoOutlined
                    style={{fontSize: '1em'}}
                  />
              </CustomTooltip>
            </Stack>
          </Box>
        </Loading>
      </Stack>
      <Divider sx={dividerMargins} orientation='vertical' variant='middle' flexItem />
      <Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <Loading loading={loading}>
          <Box sx={{ mb: 2 }}>
            <Stack direction='row' sx={{ mb: 1 }} style={{ justifyContent: 'space-between' }}>
              <Typography variant='h6'>ERA #{metrics.era}</Typography>
              <CustomTooltip
                title='An Era is a period of 24 hours during which there is a specific set of active validators. That same set cannot change while in an Era.'
              >
                <InfoOutlined 
                  style={{fontSize: '1em'}}
                />
              </CustomTooltip>
            </Stack>
            <ProgressBar value={metrics?.eraProgress} variant='determinate' />
          </Box>
          <Box>
            <Stack direction='row' sx={{ mb: 1 }} style={{ justifyContent: 'space-between' }}>
              <Typography variant='h6'>
                EPOCH #{metrics.era}-{metrics.epoch}
              </Typography>
              <CustomTooltip
                title='An Era (24h) is composed by 3 Epochs (8h). An Epoch sets the periods where important actions can take place on chain during an era, like the election of the next validator set which starts before the last epoch.'
              >
                <InfoOutlined 
                  style={{fontSize: '1em'}}
                />
              </CustomTooltip>
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
