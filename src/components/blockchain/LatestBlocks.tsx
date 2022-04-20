import { useSubscription } from '@apollo/client';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { LISTEN_FOR_BLOCKS_ORDERED } from '../../schemas/blocks.schema';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import BlockStatusIcon from './BlockStatus';
import PaperWithHeader from './PaperWithHeader';

const PAGE_LIMIT = 8;

type Block = {
  hash: string;
  number: number;
  numberFinalized: number;
  currentEra: number;
  totalEvents: number;
  numTransfers: number;
};

const ItemHandlerSkeleton: FC<{ number: number }> = ({}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs>
          <Skeleton />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs>
          <Skeleton />
        </Grid>
      </Grid>
    </Box>
  );
};

const ItemHandler: FC<{ block: Block }> = ({ block }) => {
  return (
    <Box key={block.hash} sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs>
          <Link to={`/blocks/${block.hash}`} underline='hover' variant='body2'>
            {block.number}
          </Link>
        </Grid>
        <Grid item xs='auto'>
          <BlockStatusIcon number={block.number} numberFinalized={block.numberFinalized} />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs>
          <Link to='' underline='hover' variant='body3'>
            {block.numTransfers} extrinsics
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
            <TimeAgo date={block.currentEra} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const LatestBlocks: FC<{ newBlocks: Block[] }> = ({ newBlocks }) => {
  const [state, setState] = useState<{ blocks: Block[] }>({ blocks: [] });
  React.useEffect(() => {
    const oldHashes = state.blocks.map((b) => b.hash);
    setState((prevState) => {
      return {
        ...prevState,
        blocks: newBlocks.map((block) => {
          return {
            ...block,
            newEntry: oldHashes.length && !oldHashes.includes(block.hash)
          };
        })
      };
    });

    // we really cannot listen to the newBlocks here, I think
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBlocks]);

  return (
    <>
      {state.blocks.map((b) => {
        return <ItemHandler block={b} key={b.hash} />;
      })}
    </>
  );
};

const LatestBlocksRenderer = () => {
  const { data, error, loading } = useSubscription<{ blocks: Block[] }>(LISTEN_FOR_BLOCKS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });
  const content = useMemo(() => {
    if (loading) return <ItemHandlerSkeleton number={PAGE_LIMIT} />;
    if (error || !data || !data.blocks) {
      console.warn(`${error} ${JSON.stringify(data)}`);
      return <Typography>not ready</Typography>;
    }

    return <LatestBlocks newBlocks={data.blocks} />;
  }, [loading, data, error]);
  return (
    <PaperWithHeader
      header='Latest Blocks'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'/blocks'}
      height={500}
    >
      {content}
    </PaperWithHeader>
  );
};

export default LatestBlocksRenderer;
