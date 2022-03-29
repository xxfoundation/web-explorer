import { Box, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { ClockIcon } from '../../site/icons/sfIcons';
import { theme } from '../../themes/default';
import PaperWithHeader from './PaperWithHeader';
import { Block, BlockStatus } from './types';

const blocks: Block[] = Array.from(Array(9).keys())
  .slice(1)
  .map((i) => ({
    id: 8657975 + i,
    intrinsic: 8,
    events: 11,
    status: BlockStatus.Pending,
    timestamp: new Date().getTime() - i * 1000
  }));

const statusToIconMap: Record<BlockStatus, React.ReactElement> = {
  pending: (
    <Box aria-label={'Pending'}>
      <ClockIcon color={theme.palette.error.main} />
    </Box>
  )
};

const BlockRow = ({ events, id, intrinsic, status, timestamp }: Block) => {
  return (
    <Grid key={id} container sx={{ mb: 4 }}>
      <Grid item xs>
        <Link href="" underline="hover" variant="body2">
          {id}
        </Link>
        <Box sx={{ mt: 1 }}>
          <Link href="" underline="hover" variant="body2">
            {intrinsic} instrinsic
          </Link>{' '}
          <Typography variant="body2">|</Typography>{' '}
          <Link href="" underline="hover" variant="body2">
            {events} event
          </Link>
        </Box>
      </Grid>
      <Grid item xs="auto">
        <Box sx={{ textAlign: 'right' }}>
          {statusToIconMap[status]}
          <Box>
            <Typography variant="body2">{timestamp}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const blockchain = () => {
  return (
    <PaperWithHeader header="LATEST BLOCKS" linkName={'SEE ALL'} linkAddress={'##'} height={500}>
      {blocks.map(BlockRow)}
    </PaperWithHeader>
  );
};

export default blockchain;
