import { Box, Grid, Tooltip, Typography, Stack } from '@mui/material';
import BN from 'bn.js';
import { useSubscription } from '@apollo/client';
import { LISTEN_FOR_TRANSFERS_ORDERED } from '../../schemas/transfers.schema';
import React, { FC, useMemo, useState } from 'react';
import FormatBalance from '../FormatBalance';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import DefaultTile from '../DefaultTile';
import { ItemHandlerSkeleton } from './utils'
// import { ItemHandlerSkeleton, Renderer } from './utils' // TODO
import type { Transfer } from './types'
import { shortString } from '../../utils'

const PAGE_LIMIT = 8;

const addMaskToTransactionTargets = (hash: string) => {
  const href = `/transfers/${hash}`;
  if (hash.length > 15) {
    return (
      <Tooltip title={hash} placement='top' arrow>
        <Link to={href} underline='hover'>
          {shortString(hash)}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link to={href} underline='hover'>
      {hash}
    </Link>
  );
};

const gridHeader = (elem: string) => {
  return (
    <Grid item component={'span'} xs={4}>
      <Typography variant='body3'>{elem.toString().toUpperCase()}</Typography>
    </Grid>
  );
};

const listItemSecondaryText = (data: Transfer) => {
  return (
    <Grid container maxWidth={200}>
      {gridHeader('from')}
      <Grid item>
        <Typography variant='body3'>{addMaskToTransactionTargets(data.source)}</Typography>
      </Grid>
      {gridHeader('to')}
      <Grid item>
        <Typography variant='body3'>{addMaskToTransactionTargets(data.destination)}</Typography>
      </Grid>
    </Grid>
  );
};

const ItemHandler: FC<{ transfer: Transfer }> = ({ transfer }) => {
  return (
    <Box key={transfer.extrinsicIndex} sx={{ mb: 4 }}>
      <Typography variant='body2' sx={{ mb: 1 }}>
        EXTRINSIC #{' '}
        <Link to={`/extrinsics/${transfer.extrinsicIndex}`} underline='hover'>
          {transfer.extrinsicIndex}
        </Link>
      </Typography>
      <Stack direction='row' justifyContent={'space-between'}>
        {listItemSecondaryText(transfer)}
        <Stack alignItems={'flex-end'}>
          <Typography variant='body3'>
            <TimeAgo date={transfer.timestamp} />
          </Typography>
          <Typography variant='body3'>
            <FormatBalance value={new BN(transfer.amount)} />
          </Typography>
        </Stack>
      </Stack>
    </Box >
  );
};


const LatestTransfersTable = () => {
  const { data, error, loading } = useSubscription<{ transfers: Transfer[] }>(LISTEN_FOR_TRANSFERS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });
  const content = useMemo(() => {
    if (loading) return <ItemHandlerSkeleton number={PAGE_LIMIT} />;
    if (error || !data || !data.transfers) {
      return <Typography>not ready</Typography>;
    }
    return <></>;
    // return <Renderer newTransfers={data.transfers} ItemHandler />; // TODO
  }, [loading, data, error]);
  return (
    <DefaultTile
      header='TRANSFERS'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'/transfers'}
      height={500}
    >
      {content}
    </DefaultTile>
  );
};

export default LatestTransfersTable;
