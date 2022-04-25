import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import BlockStatusIcon, { BlockStatus } from '../../components/block/BlockStatusIcon';
import { Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { TableContainer } from '../../components/Tables/TableContainer';
import TablePagination from '../../components/Tables/TablePagination';
import TimeAgo from '../../components/TimeAgo';

type Transfer = {
  amount: string;
  block: number;
  extrinsicId: string;
  from: string;
  hash: string;
  status: BlockStatus
  time: number;
  to: string;
};

const statuses: Transfer['status'][] = ['failed', 'successful', 'pending'];

const TransferRow = ({ amount, block, extrinsicId, from, hash, status, time, to }: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${extrinsicId}`;
  return (
    <TableRow key={extrinsicId}>
      <TableCell>
        <Link to={extrinsicIdLink}>{extrinsicId}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/blocks/${block}`}>{block}</Link>
      </TableCell>
      <TableCell>
        <TimeAgo date={time} />
      </TableCell>
      <TableCell colSpan={2}>
        <Stack direction='row' style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Hash value={from} truncated />
          <ArrowForwardIosIcon />
          <Hash value={to} truncated />
        </Stack>
      </TableCell>
      <TableCell>
        <FormatBalance value={amount} />
      </TableCell>
      <TableCell>
        <BlockStatusIcon status={status} />
      </TableCell>
      <TableCell>
        <Hash value={hash} truncated />
      </TableCell>
    </TableRow>
  );
};

const transfers: Transfer[] = Array.from(Array(9).keys()).map((i) => ({
  extrinsicId: '357706-' + i,
  block: 357968,
  status: statuses[Math.trunc(Math.random() * statuses.length)],
  amount: Math.trunc(Math.random() * 10000).toString(),
  from: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  to: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  time: new Date().getTime() - (i * 1000)
}));

const HistoryTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  
  return (
    <TableContainer>
      <Table sx={{ 'th:last-child, td:last-child': { maxWidth: '6px', } }}>
        <TableHead>
          <TableRow>
            <TableCell>Extrinsics id</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? transfers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : transfers
          ).map(TransferRow)}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        count={transfers.length}
        rowsPerPage={rowsPerPage}
        onPageChange={(_: unknown, number: number) => {
          setPage(number);
        }}
        rowsPerPageOptions={[20, 30, 40, 50]}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value));
          setPage(0);
        }}
      />
    </TableContainer>
  );
};

export default HistoryTable;
