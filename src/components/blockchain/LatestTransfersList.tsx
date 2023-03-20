import type { ListOfTransfers, Transfer } from '../../schemas/transfers.schema';

import { useSubscription } from '@apollo/client';
import { TableRow, TableCell, TableContainer, Typography } from '@mui/material';
import React, { FC } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import '../../assets/css/fade-adjacent.css';
import { LISTEN_FOR_TRANSFERS_ORDERED } from '../../schemas/transfers.schema';
import Address from '../Hash/XXNetworkAddress';
import DefaultTile from '../DefaultTile';
import FormatBalance from '../FormatBalance';
import Link from '../Link';
import TimeAgo from '../TimeAgo';
import Error from '../Error';
import Loading from '../Loading';
import { Table } from '../Tables/Table.styled';
import { Header, BorderlessCell } from './LatestList.styled';
import Hash from '../Hash';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PAGE_LIMIT = 8;

const TransferRow: FC<Transfer> = (props) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={3} sx={{ paddingLeft: 0 }}>
          <Header component='div' fontWeight={700}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                EXTRINSIC&nbsp;
                <Link
                  to={`/extrinsics/${props.blockNumber}-${props.extrinsicIndex}`}
                  underline='hover'
                >
                  #{`${props.blockNumber}-${props.extrinsicIndex} (event ${props.eventIndex})`}
                </Link>
              </div>
              {props.eventIndex > 0 ? (
                <CheckCircleIcon color='success' />
              ) : (
                <ErrorIcon color='error' />
              )}
              <Hash
                truncated
                value={props.extrinsic.hash}
                url={`/extrinsics/${props.extrinsic.hash}`}
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
        <BorderlessCell sx={{ borderBottom: 'none', paddingLeft: 0 }}>
          <Header>From</Header>
        </BorderlessCell>
        <BorderlessCell>
          <div>
            <Address
              offset={4}
              sx={{ fontSize: 14, fontWeight: 400 }}
              roles={props.sourceAccount}
              value={props.source}
              name={props.sourceAccount.identity?.display}
              url={`/accounts/${props.source}`}
              truncated
            />
          </div>
        </BorderlessCell>
        <BorderlessCell>
          <div>
            <Typography variant='body3' sx={{ whiteSpace: 'nowrap' }}>
              <TimeAgo date={props.timestamp} />
            </Typography>
          </div>
        </BorderlessCell>
      </TableRow>
      <TableRow>
        <BorderlessCell>
          <Header>to</Header>
        </BorderlessCell>
        <BorderlessCell>
          <div>
            <Address
              offset={4}
              sx={{ fontSize: 14, fontWeight: 400 }}
              value={props.destination}
              roles={props.destinationAccount}
              name={props.destinationAccount.identity?.display}
              url={`/accounts/${props.destination}`}
              truncated
            />
          </div>
        </BorderlessCell>
        <BorderlessCell>
          <div>
            <Typography variant='body3'>
              <FormatBalance value={props.amount.toString()} />
            </Typography>
          </div>
        </BorderlessCell>
      </TableRow>
      <TableRow>
        <BorderlessCell colSpan={3}>
          <div />
        </BorderlessCell>
      </TableRow>
    </>
  );
};

const LatestTransfersList = () => {
  const { data, error, loading } = useSubscription<ListOfTransfers>(LISTEN_FOR_TRANSFERS_ORDERED, {
    variables: { limit: PAGE_LIMIT }
  });

  return (
    <DefaultTile header={'Transfers'} linkName={'SEE ALL'} linkAddress={'/transfers'} height={500}>
      {loading && <Loading size='lg' />}
      {error && <Error />}
      <TableContainer>
        <Table size={!loading ? 'small' : undefined}>
          <TransitionGroup component='tbody'>
            {data?.transfers?.map((tx) => (
              <CSSTransition
                classNames='fade'
                timeout={500}
                key={tx.extrinsic.hash + tx.eventIndex}
              >
                <TransferRow {...tx} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </TableContainer>
    </DefaultTile>
  );
};

export default LatestTransfersList;
