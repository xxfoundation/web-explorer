import type { Block, ListBlocks } from './types';

import { useSubscription } from '@apollo/client';
import { TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react';

import useNewnessTracker, { WithNew } from '../../hooks/useNewnessTracker';
import { LISTEN_FOR_LATEST_BLOCKS } from '../../schemas/blocks.schema';
import BlockStatusIcon from '../block/BlockStatusIcon';
import DefaultTile from '../DefaultTile';
import Link from '../Link';
import SkeletonRows from '../Tables/SkeletonRows';
import { Table } from '../Tables/TableContainer.styled';
import TimeAgo from '../TimeAgo';
import Error from '../Error';
import { BorderlessCell, Header } from './LatestList.styled';
import Hash from '../Hash';

const PAGE_LIMIT = 10;

const BlockRow: FC<WithNew<Block>> = ({
  finalized,
  hash,
  number,
  timestamp,
  totalEvents,
  totalExtrinsics
}) => (
  <>
    <TableRow>
      <TableCell colSpan={4}>
        <Header>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Block&nbsp;
              <Link to={`/blocks/${number}`} underline='hover' variant='body2'>
                #{number}
              </Link>
            </div>
            <Hash
              truncated
              value={hash}
              url={`/blocks/${hash}`}
              sx={{
                fontSize: 14,
                fontWeight: 400,
                fontFamily: 'Roboto',
                textTransform: 'lowercase'
              }}
            />
          </div>
        </Header>
      </TableCell>
    </TableRow>
    <TableRow>
      <BorderlessCell>
        <Link to={'/extrinsics'} underline='hover' variant='body3'>
          {totalExtrinsics} extrinsics
        </Link>{' '}
      </BorderlessCell>
      <BorderlessCell>
        <Link to={'/events'} underline='hover' variant='body3'>
          {totalEvents} events
        </Link>
      </BorderlessCell>
      <BorderlessCell>
        <BlockStatusIcon status={finalized ? 'successful' : 'pending'} />
      </BorderlessCell>
      <BorderlessCell>
        <Typography variant='body3' sx={{ whiteSpace: 'nowrap' }}>
          <TimeAgo date={timestamp} />
        </Typography>
      </BorderlessCell>
    </TableRow>
    <TableRow>
      <BorderlessCell colSpan={4} />
    </TableRow>
  </>
);

const LatestBlocksList = () => {
  const { data, error, loading } = useSubscription<ListBlocks>(LISTEN_FOR_LATEST_BLOCKS, {
    variables: { limit: PAGE_LIMIT }
  });

  const tracked = useNewnessTracker(data?.blocks, 'hash');

  return (
    <DefaultTile header={'Blocks'} linkName={'SEE ALL'} linkAddress={'/blocks'} height={500}>
      <TableContainer>
        <Table size={!loading ? 'small' : undefined}>
          <TableBody>
            {loading && <SkeletonRows rows={10} columns={4} />}
            {error && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Error />
                </TableCell>
              </TableRow>
            )}
            {tracked?.map((block) => (
              <BlockRow {...block} key={block.number} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultTile>
  );
};

export default LatestBlocksList;
