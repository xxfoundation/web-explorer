import { useSubscription } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { LISTEN_FOR_BLOCKS_ORDERED } from '../../schemas/blocks.schema';
import BlockStatusIcon from '../block/BlockStatusIcon';
import genSkeletons from '../genSkeletons';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import PaperWithHeader from './PaperWithHeader';

const PAGE_LIMIT = 8;

type Block = {
  hash: string;
  number: number;
  finalized: boolean;
  currentEra: number;
  totalEvents: number;
  totalExtrinsics: number;
  timestamp: number;
};

const ItemHandlerSkeleton: FC<{ number: number }> = ({ number }) => {
  return (
    <>
      {genSkeletons(number).map((Skeleton, index) => {
        return (
          <Box sx={{ mb: 4 }} key={index}>
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
      })}
    </>
  );
};

const ItemHandler: FC<{ block: Block }> = ({ block }) => {
  return (
    <Box key={block.hash} sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs>
          <Link to={`/blocks/${block.number}`} underline='hover' variant='body2'>
            {block.number}
          </Link>
        </Grid>
        <Grid item xs='auto'>
          <BlockStatusIcon
            status={block.finalized ? 'successful' : 'pending'}
          />
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

const LatestBlocksTable = () => {
  const { data, error, loading } = useSubscription<{ blocks: Block[] }>(LISTEN_FOR_BLOCKS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });
  console.warn(error);
  const content = useMemo(() => {
    if (loading) return <ItemHandlerSkeleton number={PAGE_LIMIT} />;
    if (error || !data || !data.blocks) {
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

export default LatestBlocksTable;
