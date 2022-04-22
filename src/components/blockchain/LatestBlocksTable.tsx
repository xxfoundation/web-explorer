import ClockIcon from '@mui/icons-material/AccessTime';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import PaperWithHeader from './PaperWithHeader';
import { Block, BlockStatus } from './types';

const blocks: Block[] = Array.from(Array(9).keys())
  .slice(1)
  .map((i) => ({
    id: 8657975 + i,
    extrinsic: 8,
    events: 11,
    status: BlockStatus.Pending,
    timestamp: new Date().getTime() - i * 1000
  }));

const statusToIconMap: Record<BlockStatus, React.ReactElement> = {
  pending: (
    <Box aria-label={'Pending'}>
      <ClockIcon color='warning' />
    </Box>
  )
};

const BlockRow = ({ events, extrinsic: extrinsics, id, status, timestamp }: Block) => {
  return (
    <Box key={id} sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs>
          <Link to={`/blocks/${id}`} underline='hover' variant='body2'>
            {id}
          </Link>
        </Grid>
        <Grid item xs='auto'>
          {statusToIconMap[status]}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs>
          <Link to='' underline='hover' variant='body3'>
            {extrinsics} extrinsics
          </Link>{' '}
          <Typography variant='body3' component='span'>|</Typography>{' '}
          <Link to={'/events'} underline='hover' variant='body3'>
            {events} event
          </Link>
        </Grid>
        <Grid item xs='auto'>
          <Typography variant='body2'>
            <TimeAgo date={timestamp} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const blockchain = () => {
  return (
    <PaperWithHeader
      header='Latest Blocks'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'/blocks'}
      height={500}
    >
      {blocks.map(BlockRow)}
    </PaperWithHeader>
  );
};

export default blockchain;
