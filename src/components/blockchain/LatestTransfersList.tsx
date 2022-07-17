import { useSubscription } from '@apollo/client';
import { TableBody, TableRow, TableCell, TableContainer, Typography } from '@mui/material';
import React, { FC } from 'react';
import useNewnessTracker, { WithNew } from '../../hooks/useNewnessTracker';
import { LISTEN_FOR_TRANSFERS_ORDERED } from '../../schemas/transfers.schema';
import Address from '../Hash/XXNetworkAddress';
import DefaultTile from '../DefaultTile';
import FormatBalance from '../FormatBalance';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import type { ListOfTransfers, Transfer } from './types';
import Error from '../Error';
import SkeletonRows from '../Tables/SkeletonRows';
import { Table } from '../Tables/TableContainer.styled';
import { Header, BorderlessCell } from './LatestList.styled';

const PAGE_LIMIT = 8;

const TransferRow: FC<WithNew<Transfer>> = (props) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={3} sx={{ paddingLeft: 0 }}>
          <Header fontWeight={700}>
            EXTRINSIC&nbsp;
            <Link to={`/extrinsics/${props.blockNumber}-${props.extrinsicIndex}`} underline='hover'>
              #{`${props.blockNumber}-${props.extrinsicIndex}`}
            </Link>
          </Header>
        </TableCell>
      </TableRow>
      <TableRow>
        <BorderlessCell sx={{ borderBottom: 'none', paddingLeft: 0 }}>
          <Header>
            From
          </Header>
        </BorderlessCell>
        <BorderlessCell>
          <Address
            offset={4}
            sx={{ fontSize: 14, fontWeight: 400 }}
            value={props.source}
            url={`/accounts/${props.source}`}
            truncated
          />
        </BorderlessCell>
        <BorderlessCell>
          <Typography variant='body3' sx={{ whiteSpace: 'nowrap' }}>
            <TimeAgo date={props.timestamp} />
          </Typography>
        </BorderlessCell>
      </TableRow>
      <TableRow>
        <BorderlessCell>
          <Header>
            to
          </Header>
        </BorderlessCell>
        <BorderlessCell>
          <Address
            offset={4}
            sx={{ fontSize: 14, fontWeight: 400 }}
            value={props.destination}
            url={`/accounts/${props.destination}`}
            truncated
          />
        </BorderlessCell>
        <BorderlessCell>
          <Typography variant='body3'>
            <FormatBalance value={props.amount} />
          </Typography>
        </BorderlessCell>
      </TableRow>
      <TableRow><BorderlessCell colSpan={3} /></TableRow>
    </>
  );
};

const LatestTransfersList = () => {
  const { data, error, loading } = useSubscription<ListOfTransfers>(LISTEN_FOR_TRANSFERS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });

  const transfers = useNewnessTracker(data?.transfers, 'hash');

  return (
    <DefaultTile
      header={'Transfers'}
      linkName={'SEE ALL'}
      linkAddress={'/blocks'}
      height={500}>
        <TableContainer>
          <Table size={!loading ? 'small': undefined}>
            <TableBody>
              {loading && <SkeletonRows rows={10} columns={3} />}
              {error && <TableRow><TableCell colSpan={3}><Error /></TableCell></TableRow>}
              {transfers?.map((tx) => <TransferRow {...tx} key={tx.hash} />)}
            </TableBody>
          </Table>
        </TableContainer>
    </DefaultTile>
  );
};

export default LatestTransfersList;
