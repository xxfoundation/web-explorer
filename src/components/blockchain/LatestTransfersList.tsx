import { useSubscription } from '@apollo/client';
import { Box, Grid, Stack, Typography } from '@mui/material';
import BN from 'bn.js';
import React, { FC } from 'react';
import { useSubscriptionUpdater } from '../../hooks/useSubscriptionUpdater';
import { LISTEN_FOR_TRANSFERS_ORDERED } from '../../schemas/transfers.schema';
import { Address } from '../ChainId';
import DefaultTile from '../DefaultTile';
import FormatBalance from '../FormatBalance';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import { ListSkeleton } from './ListSkeleton';
import type { Transfer } from './types';

const PAGE_LIMIT = 8;

const ItemHandler: FC<{ transfer: Transfer }> = ({ transfer }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='body2' sx={{ mb: 1 }}>
        EXTRINSIC #{' '}
        <Link to={`/extrinsics/${transfer.extrinsicIndex}`} underline='hover'>
          {transfer.extrinsicIndex}
        </Link>
      </Typography>
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
        <Grid container maxWidth={200}>
          <Grid item component={'span'} xs={4}>
            <Typography variant='body3' textTransform='uppercase'>
              from
            </Typography>
          </Grid>
          <Grid item>
            <Address
              value={transfer.source}
              link={`/transfers/${transfer.source}`}
              truncated
              disableAvatar
            />
          </Grid>
          <Grid item component={'span'} xs={4}>
            <Typography variant='body3' textTransform='uppercase'>
              to
            </Typography>
          </Grid>
          <Grid item>
            <Address
              value={transfer.destination}
              link={`/transfers/${transfer.destination}`}
              truncated
              disableAvatar
            />
          </Grid>
        </Grid>
        <Stack alignItems={'flex-end'}>
          <Typography variant='body3'>
            <TimeAgo date={transfer.timestamp} />
          </Typography>
          <Typography variant='body3'>
            <FormatBalance value={new BN(transfer.amount)} />
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const LatestTransfersList = () => {
  const { data, loading } = useSubscription<{ transfers: Transfer[] }>(
    LISTEN_FOR_TRANSFERS_ORDERED,
    { variables: { limit: PAGE_LIMIT } }
  );
  const content = useSubscriptionUpdater({
    key: 'extrinsicIndex',
    newData: data?.transfers
  }).map((transfer) => <ItemHandler transfer={transfer} key={transfer.extrinsicIndex} />);

  return (
    <DefaultTile
      header='TRANSFERS'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'/transfers'}
      height={500}
    >
      {loading ? <ListSkeleton number={PAGE_LIMIT} /> : content}
    </DefaultTile>
  );
};

export default LatestTransfersList;
