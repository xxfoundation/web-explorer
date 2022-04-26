import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import BlockStatusIcon, { BlockStatus } from '../../components/block/BlockStatusIcon';
import { Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaseLineCellWrapper, BaselineTable } from '../../components/Tables';
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
  from: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  to: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
  time: new Date().getTime() - i * 1000
}));

const TransferRow = ({ amount, block, extrinsicId, from, hash, status, time, to }: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${extrinsicId}`;
  return [
    BaseLineCellWrapper(<Link to={extrinsicIdLink}>{extrinsicId}</Link>),
    BaseLineCellWrapper(<Link to={`/blocks/${block}`}>{block}</Link>),
    BaseLineCellWrapper(<TimeAgo date={time} />),
    {
      value: (
        <Stack direction='row' style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Hash value={from} truncated />
          <ArrowForwardIosIcon />
          <Hash value={to} truncated />
        </Stack>
      ),
      props: { colSpan: 2 }
    },
    BaseLineCellWrapper(<FormatBalance value={amount} />),
    BaseLineCellWrapper(<BlockStatusIcon status={status} />),
    BaseLineCellWrapper(<Hash value={hash} truncated />)
  ];
};

const headers = BaseLineCellsWrapper([
  'Extrinsics id',
  'Block',
  'Time',
  'From',
  'To',
  'Amount',
  'Result',
  'Hash'
]);

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
      tableProps={{ sx: { 'th:last-child, td:last-child': { maxWidth: '6px' } } }}
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
