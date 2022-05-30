import { useQuery } from '@apollo/client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
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
  GetTransfersByBlock,
  LIST_TRANSFERS_ORDERED,
  Transfer
} from '../../schemas/transfers.schema';

const TransferRow = (data: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;
  return [
    { value: <Link to={extrinsicIdLink}>{`${data.blockNumber}-${data.index}`}</Link> },
    { value: <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link> },
    { value: <TimeAgo date={data.timestamp} /> },
    {
      value: (
        <Grid container>
          <Grid xs={5} item>
            {<Address value={data.source} truncated />}
          </Grid>
          <Grid xs={1} item>
            <ArrowForwardIosIcon />
          </Grid>
          <Grid xs={5} item>
            {<Address value={data.destination} truncated />}
          </Grid>
        </Grid>
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

const TransferTable: FC<{ where?: Record<string, unknown> }> = ({ where = {} }) => {
  const { cursorField, limit, offset, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor<Transfer & { id: number }>({
      cursorField: 'id',
      rowsPerPage: 20
    });
  const variables = useMemo(
    () => ({
      limit,
      offset,
      orderBy: [{ id: 'desc' }],
      where: { ...where, id: { _lte: cursorField } }
    }),
    [cursorField, limit, offset, where]
  );
  const { data, loading } = useQuery<GetTransfersByBlock>(LIST_TRANSFERS_ORDERED, {
    variables
  });
  const footer = useMemo(() => {
    if (data?.agg && data?.transfers && data.transfers.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.transfers[0])}
          rowsPerPageOptions={[20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.transfers, onPageChange, onRowsPerPageChange, page, rowsPerPage]);
  if (loading) return <TableSkeleton rows={12} cells={6} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={(data?.transfers || []).map(TransferRow)}
      footer={footer}
    />
  );
};

export default TransferTable;
