import type { Block, ListBlocks } from './types';

import { useSubscription } from '@apollo/client';
import { TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import '../../assets/css/fade-adjacent.css';
import { LISTEN_FOR_LATEST_BLOCKS } from '../../schemas/blocks.schema';
import BlockStatusIcon from '../block/BlockStatusIcon';
import DefaultTile from '../DefaultTile';
import Link from '../Link';
import Loading from '../Loading';
import { Table } from '../Tables/Table.styled';
import TimeAgo from '../TimeAgo';
import Error from '../Error';
import { BorderlessCell, Header } from './LatestList.styled';
import Hash from '../Hash';

const PAGE_LIMIT = 10;

const BlockRow: FC<Block> = ({
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
        <Header component='div'>
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
                textTransform: 'lowercase'
              }}
            />
          </div>
        </Header>
      </TableCell>
    </TableRow>
    <TableRow>
      <BorderlessCell>
        <div>
          <Link to={'/extrinsics'} underline='hover' variant='body3'>
            {totalExtrinsics} extrinsics
          </Link>{' '}
        </div>
      </BorderlessCell>
      <BorderlessCell>
        <div>
          <Link to={'/events'} underline='hover' variant='body3'>
            {totalEvents} events
          </Link>
        </div>
      </BorderlessCell>
      <BorderlessCell>
        <div>
          <BlockStatusIcon status={finalized ? 'successful' : 'pending'} />
        </div>
      </BorderlessCell>
      <BorderlessCell>
        <div>
          <Typography variant='body3' sx={{ whiteSpace: 'nowrap' }}>
            <TimeAgo date={timestamp} />
          </Typography>
        </div>
      </BorderlessCell>
    </TableRow>
    <TableRow>
      <div>
        <BorderlessCell colSpan={4} />
      </div>
    </TableRow>
  </>
);

const LatestBlocksList = () => {
  const { data, error, loading } = useSubscription<ListBlocks>(LISTEN_FOR_LATEST_BLOCKS, {
    variables: { limit: PAGE_LIMIT }
  });

  return (
    <DefaultTile header={'Blocks'} linkName={'SEE ALL'} linkAddress={'/blocks'} height={500}>
      {loading && <Loading size='lg' />}
      {error && <Error />}
      <TableContainer>
        <Table size={!loading ? 'small' : undefined}>
          <TransitionGroup component='tbody'>
            {data?.blocks?.map((block) => (
              <CSSTransition
                classNames='fade'
                timeout={500}
                key={block.number}>
                  <BlockRow {...block} />
                </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </TableContainer>
    </DefaultTile>
  );
};

export default LatestBlocksList;
