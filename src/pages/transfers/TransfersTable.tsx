import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import BlockStatusIcon, { BlockStatus } from '../../components/block/BlockStatusIcon';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import TimeAgo from '../../components/TimeAgo';

type Transfer = {
  amount: string;
  block: number;
  extrinsicId: string;
  from: string;
  hash: string;
  status: BlockStatus;
  time: number;
  to: string;
};

const statuses: Transfer['status'][] = ['failed', 'successful', 'pending'];

const transfers: Transfer[] = Array.from(Array(9).keys()).map((i) => ({
  extrinsicId: '357706-' + i,
  block: 357968,
  status: statuses[Math.trunc(Math.random() * statuses.length)],
  amount: Math.trunc(Math.random() * 10000).toString(),
  from: '6X2TfhL43goaEpJ3uWssySx159oFjs2TDAP6aKxmCbia1o7g',
  to: '6WZqZqVs1Ps6b3iUUpHFzFdt3614gf62Fug5wJVR8Ur6vGSr',
  hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  time: new Date().getTime() - i * 1000
}));

const TransferRow = ({ amount, block, extrinsicId, from, hash, status, time, to }: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${extrinsicId}`;
  return [
    { value: <Link to={extrinsicIdLink}>{extrinsicId}</Link> },
    { value: <Link to={`/blocks/${block}`}>{block}</Link> },
    { value: <TimeAgo date={time} /> },
    {
      value: (
        <Stack
          direction='row'
          style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}
          maxWidth={'260px'}
        >
          <Hash value={from} truncated />
          <ArrowForwardIosIcon />
          <Address value={to} truncated />
        </Stack>
      )
    },
    { value: <FormatBalance value={amount} /> },
    { value: <BlockStatusIcon status={status} /> },
    { value: <Hash value={hash} truncated /> }
  ];
};

const headers = [
  { value: 'Extrinsics id' },
  { value: 'Block' },
  { value: 'Time' },
  {
    value: (
      <Stack direction={'row'} justifyContent={'space-between'} maxWidth={'260px'}>
        <Typography>From</Typography>
        <Typography>To</Typography>
      </Stack>
    )
  },
  { value: 'Amount' },
  { value: 'Result' },
  { value: 'Hash' }
];

const TransferTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const rows = useMemo(() => {
    return (
      rowsPerPage > 0
        ? transfers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : transfers
    ).map(TransferRow);
  }, [page, rowsPerPage]);
  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  }, []);

  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);

  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          page={page}
          count={transfers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
    />
  );
};

export default TransferTable;
