import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';
import StakingSupplyChart from './StakingSupplyChart';

const dividerMargins = { ml: 3, mr: 3, mt: 0, mb: 0 };

export default () => (
  <Stack direction={{ xs: 'column', md: 'row'}}>
    <Stack direction={{ xs: 'row', md: 'column' }} spacing={{ xs: 3 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h6'>
          Average Return
        </Typography>
        <Typography  variant='h3'>
          40.90%
        </Typography>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h6'>
          Inflation Rate
        </Typography>
        <Typography variant='h3'>
          N/A
        </Typography>
      </Box>
    </Stack>
    <Divider sx={dividerMargins} orientation='vertical' variant='middle' flexItem />
    <Stack style={{ flexGrow: 1 }}>
      <Box sx={{ mb: 5 }}>
        <Stack direction='row' sx={{ mb: 1 }} style={{ justifyContent: 'space-between'}}>
          <Typography variant='h6'>
            ERA #627
          </Typography>
          <Typography variant='h6' style={{ fontWeight: 400 }}>
            BLOCKS : 10,319/14,400
          </Typography>
        </Stack>
        <ProgressBar value={90} variant='determinate' />
      </Box>
      <Box sx={{ mb: 5 }}>
        <Stack direction='row' sx={{ mb: 1 }} style={{ justifyContent: 'space-between'}}>
          <Typography variant='h6'>
            EPOCH #627-3
          </Typography>
          <Typography variant='h6' style={{ fontWeight: 400 }}>
            BLOCKS :719/4,800
          </Typography>
        </Stack>
        <ProgressBar value={10} variant='determinate' />
      </Box>
    </Stack>
    <Divider sx={dividerMargins} orientation='vertical' variant='middle' flexItem />
    <Box>
      <StakingSupplyChart id='staking-supply-chart' />
    </Box>
  </Stack>
)