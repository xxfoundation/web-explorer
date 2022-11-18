import type { Block, ListBlocks } from './types';

import { useSubscription } from '@apollo/client';
import { TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TableRow>
        <TableCell colSpan={4}>
          <Header component='div'>
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                {t('Block')}&nbsp;
                <Link to={`/blocks/${number}`} underline='hover' variant='body2'>
                  #{number}
                </Link>
              </span>
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
            </span>
          </Header>
        </TableCell>
      </TableRow>
      <TableRow>
        <BorderlessCell>
          <span>
            <Link to={'/extrinsics'} underline='hover' variant='body3'>
              {t('{{amount}} extrinsics', { amount: totalExtrinsics })}
            </Link>{' '}
          </span>
        </BorderlessCell>
        <BorderlessCell>
          <span>
            <Link to={'/events'} underline='hover' variant='body3'>
              {t('{{amount}} events', { amount: totalEvents })}
            </Link>
          </span>
        </BorderlessCell>
        <BorderlessCell>
          <span>
            <BlockStatusIcon status={finalized ? 'successful' : 'pending'} />
          </span>
        </BorderlessCell>
        <BorderlessCell>
          <span>
            <Typography variant='body3' sx={{ whiteSpace: 'nowrap' }}>
              <TimeAgo date={timestamp} />
            </Typography>
          </span>
        </BorderlessCell>
      </TableRow>
      <TableRow>
        <div>
          <BorderlessCell colSpan={4} />
        </div>
      </TableRow>
    </>
  );
}

const LatestBlocksList = () => {
  const { t } = useTranslation();
  const { data, error, loading } = useSubscription<ListBlocks>(LISTEN_FOR_LATEST_BLOCKS, {
    variables: { limit: PAGE_LIMIT }
  });

  return (
    <DefaultTile
      header={t('Blocks')}
      linkName={t('SEE ALL')}
      linkAddress={'/blocks'}
      height={500}>
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
