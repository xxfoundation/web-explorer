import { useSubscription } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import useNewnessTracker, { WithNew } from '../../hooks/useNewnessTracker';
import { LISTEN_FOR_BLOCKS_ORDERED } from '../../schemas/blocks.schema';
import BlockStatusIcon from '../block/BlockStatusIcon';
import DefaultTile from '../DefaultTile';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import { ListSkeleton } from './ListSkeleton';
import { Block, ListBlocks } from './types';

const PAGE_LIMIT = 8;

const ItemHandler: FC<{ block: WithNew<Block> }> = ({ block }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs>
          <Link to={`/blocks/${block.number}`} underline='hover' variant='body2'>
            {block.number}
          </Link>
        </Grid>
        <Grid item xs='auto'>
          <BlockStatusIcon status={block.finalized ? 'successful' : 'pending'} />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs>
          <Link to='' underline='hover' variant='body3'>
            {block.totalExtrinsics} extrinsics
          </Link>{' '}
          <Typography variant='body3' component='span'>
            |
          </Typography>{' '}
          <Link to={'/events'} underline='hover' variant='body3'>
            {block.totalEvents} event
          </Link>
        </Grid>
        <Grid item xs='auto'>
          <Typography variant='body2'>
            <TimeAgo date={block.timestamp} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const LatestBlocksList = () => {
  const { data, loading } = useSubscription<ListBlocks>(LISTEN_FOR_BLOCKS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });

  const tracked = useNewnessTracker(data?.blocks, 'hash');

  return (
    <DefaultTile
      header='Latest Blocks'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'/blocks'}
      height={500}
    >
      {loading
        ? <ListSkeleton number={PAGE_LIMIT} />
        : tracked?.map((block) => (
          <ItemHandler block={block} key={block.hash} />
        ))
      }
    </DefaultTile>
  );
};

export default LatestBlocksList;
