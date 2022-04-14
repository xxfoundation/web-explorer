import { useSubscription } from '@apollo/client';
import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Box, Grid, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { LIST_BLOCKS_ORDERED } from '../../schemas/blocks.schema';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import PaperWithHeader from './PaperWithHeader';
import { Block } from './types';

const PAGE_LIMIT = 4;

const statusToIconMap: Record<string, React.ReactElement> = {
  pending: (
    <Box aria-label={'Pending'}>
      <ClockIcon color='warning' />
    </Box>
  ),
  completed: (
    <Box aria-label={'Completed'}>
      <CheckCircleOutlinedIcon color='success' />
    </Box>
  )
};

const ItemHandler: FC<{ block: Block }> = ({ block }) => {
  return (
    <Box key={block.block_hash} sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs>
          <Link to={`/blocks/${block.block_hash}`} underline='hover' variant='body2'>
            {block.block_number}
          </Link>
        </Grid>
        <Grid item xs='auto'>
          {block.block_number >= block.block_number_finalized ? statusToIconMap.pending : null}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs>
          <Link to='' underline='hover' variant='body3'>
            {block.num_transfers} extrinsics
          </Link>{' '}
          <Typography variant='body3' component='span'>
            |
          </Typography>{' '}
          <Link to={'/events'} underline='hover' variant='body3'>
            {block.total_events} event
          </Link>
        </Grid>
        <Grid item xs='auto'>
          <Typography variant='body2'>
            <TimeAgo date={block.current_era} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Blockchain: FC<{ newBlocks: Block[] }> = ({ newBlocks }) => {
  const [state, setState] = useState<{ blocks: Block[] }>({ blocks: [] });
  React.useEffect(() => {
    const oldHashes = state.blocks.map((b) => b.block_hash);
    setState((prevState) => {
      return {
        ...prevState,
        blocks: newBlocks.map((block) => {
          return {
            ...block,
            newEntry: oldHashes.length && !oldHashes.includes(block.block_hash)
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
        return <ItemHandler block={b} key={b.block_hash} />;
      })}
    </>
  );
};

const BlockChainRenderer = () => {
  const { data, error, loading } = useSubscription<{ blockchain_blocks: Block[] }>(
    LIST_BLOCKS_ORDERED,
    {
      variables: { limit: PAGE_LIMIT }
    }
  );
  const content = useMemo(() => {
    if (loading || error || !data || !data.blockchain_blocks)
      return <Typography>loading</Typography>;

    return <Blockchain newBlocks={data.blockchain_blocks} />;
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

export default BlockChainRenderer;
