import { useQuery } from '@apollo/client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgo from '../../components/TimeAgo';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import {
  GetTransferencesByBlock,
  GET_TRANSFERS_OF_BLOCK,
  Transference
} from '../../schemas/transfers.schema';

const TransferRow = (data: Transference) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;
  return [
    { value: <Link to={extrinsicIdLink}>{`${data.blockNumber}-${data.index}`}</Link> },
    { value: <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link> },
    { value: <TimeAgo date={data.timestamp} /> },
    {
      value: (
        <Stack
          direction='row'
          style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}
          maxWidth={'260px'}
        >
          <Address value={data.source} truncated />
          <ArrowForwardIosIcon />
          <Address value={data.destination} truncated />
        </Stack>
      )
    },
    { value: <FormatBalance value={data.amount.toString()} /> },
    { value: <BlockStatusIcon status={data.success ? 'successful' : 'failed'} /> },
    { value: <Hash value={data.hash} truncated showTooltip /> }
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
  const { cursorField, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor<Transference & { id: number }>({
      cursorField: 'id',
      rowsPerPage: 20
    });
  const { data, loading } = useQuery<GetTransferencesByBlock>(GET_TRANSFERS_OF_BLOCK, {
    variables: {
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      orderBy: [{ id: 'desc' }],
      where: { id: { _lte: cursorField } }
    }
  });
  if (loading) return <TableSkeleton rows={12} cells={6} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={(data?.transfers || []).map(TransferRow)}
      footer={
        <TablePagination
          page={page}
          count={data?.transfers.length || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data?.transfers.at(0))}
          rowsPerPageOptions={[20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
    />
  );
};

export default TransferTable;
