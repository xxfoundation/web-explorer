import { Box, Grid, Tooltip, Typography, Stack } from '@mui/material';
import BN from 'bn.js';
import { useSubscription } from '@apollo/client';
import { LISTEN_FOR_TRANSFERS_ORDERED } from '../../schemas/transfers.schema';
import React, { FC, useMemo, useState } from 'react';
import FormatBalance from '../FormatBalance';
import genSkeletons from '../genSkeletons';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import PaperWithHeader from './PaperWithHeader';

const PAGE_LIMIT = 8;

type Transfer = {
  hash: string;
  blockNumber: number;
  extrinsicIndex: number;
  source: string;
  destination: string;
  amount: number;
  fee_amount: number;
  section: string;
  method: string;
  success: boolean;
  timestamp: number;
};


// const transfers: Transfer[] = Array.from(Array(9).keys())
//   .slice(1)
//   .map((i) => {
//     return {
//       extrinsicIndex: '314658-5', // TODO mask?
//       id: i,
//       from: '0xacc15dc74899999', // TODO use just mask instead of manipulating the value
//       to: '0xacc15dc748888',
//       amount: '100000000000',
//       timestamp: new Date().getTime() - i * 1000
//     };
//   });

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

const addMaskToTransactionTargets = (hash: string) => {
  const href = `/transfers/${hash}`;
  if (hash.length > 15) {
    return (
      <Tooltip title={hash} placement='top' arrow>
        <Link to={href} underline='hover'>
          {hash.split('').slice(0, 12).join('') + '...'}
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

const LatestTransfers: FC<{ newTransfers: Transfer[] }> = ({ newTransfers }) => {
  const [state, setState] = useState<{ transfers: Transfer[] }>({ transfers: [] });
  React.useEffect(() => {
    const oldHashes = state.transfers.map((b) => b.hash);
    setState((prevState) => {
      return {
        ...prevState,
        transfers: newTransfers.map((transfer) => {
          return {
            ...transfer,
            newEntry: oldHashes.length && !oldHashes.includes(transfer.hash)
          };
        })
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTransfers]);

  return (
    <>
      {state.transfers.map((b) => {
        return <ItemHandler transfer={b} key={b.hash} />;
      })}
    </>
  );
};

const LatestTransfersTable = () => {
  const { data, error, loading } = useSubscription<{ transfers: Transfer[] }>(LISTEN_FOR_TRANSFERS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });
  console.warn(error);
  const content = useMemo(() => {
    if (loading) return <ItemHandlerSkeleton number={PAGE_LIMIT} />;
    if (error || !data || !data.transfers) {
      return <Typography>not ready</Typography>;
    }

    return <LatestTransfers newTransfers={data.transfers} />;
  }, [loading, data, error]);
  return (
    <PaperWithHeader
      header='TRANSFERS'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'/transfers'}
      height={500}
    >
      {content}
    </PaperWithHeader>
  );
};

export default LatestTransfersTable;
