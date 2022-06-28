import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import Error from '../../components/Error';
import TimeAgo from '../../components/TimeAgo';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import {
  GetTransfersByBlock,
  LIST_TRANSFERS_ORDERED,
  Transfer
} from '../../schemas/transfers.schema';

const ROWS_PER_PAGE = 20;

const TransferRow = (data: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;
  return [
    { value: <Link to={extrinsicIdLink}>{`${data.blockNumber}-${data.index}`}</Link> },
    { value: <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link> },
    { value: <TimeAgo date={data.timestamp} /> },
    {
      value: <Address value={data.source} url={`/accounts/${data.source}`} truncated />
    },
    {
      value: <Address value={data.destination} url={`/accounts/${data.destination}`} truncated />
    },
    { value: <FormatBalance value={data.amount.toString()} /> },
    { value: <BlockStatusIcon status={data.success ? 'successful' : 'failed'} /> },
    { value: <Hash truncated value={data.hash} url={extrinsicIdLink} showTooltip /> }
  ];
};

const headers = [
  { value: 'Extrinsics id' },
  { value: 'Block' },
  { value: 'Time' },
  {
    value: <Typography>To</Typography>
  },
  {
    value: <Typography>From</Typography>
  },
  { value: 'Amount' },
  { value: 'Result' },
  { value: 'Hash' }
];

const TransferTable: FC<{
  where?: Record<string, unknown>;
  setCount?: Dispatch<SetStateAction<number | undefined>>;
}> = ({ where = {}, setCount: setCount }) => {
  const { limit, makeOnPageChange, offset, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor<Transfer & { id: number }>({
      cursorField: 'id',
      rowsPerPage: ROWS_PER_PAGE
    });

  const variables = useMemo(
    () => ({
      limit,
      offset,
      orderBy: [{ timestamp: 'desc' }],
      where
    }),
    [limit, offset, where]
  );

  const { data, error, loading } = useQuery<GetTransfersByBlock>(LIST_TRANSFERS_ORDERED, {
    variables
  });

  const footer = useMemo(() => {
    if (data?.agg && data?.transfers && data.transfers.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={makeOnPageChange(data.transfers[0])}
          rowsPerPageOptions={[ROWS_PER_PAGE, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.transfers, makeOnPageChange, onRowsPerPageChange, page, rowsPerPage]);
  
  useEffect(() => {
    if (data?.agg && setCount) {
      setCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount]);

  if (error) return <Error type='data-unavailable' />;
  if (loading) return <TableSkeleton rows={rowsPerPage} cells={headers.length} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={(data?.transfers || []).map(TransferRow)}
      footer={footer}
    />
  );
};

export default TransferTable;
