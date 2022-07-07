import { Typography } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaselineTable } from '../../components/Tables';
import TimeAgo from '../../components/TimeAgo';
import {
  GetTransfersByBlock,
  LIST_TRANSFERS_ORDERED,
  Transfer
} from '../../schemas/transfers.schema';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';


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
  { value: 'Extrinsic id' },
  { value: 'Block' },
  { value: 'Time' },
  {
    value: <Typography>From</Typography>
  },
  {
    value: <Typography>To</Typography>
  },
  { value: 'Amount' },
  { value: 'Result' },
  { value: 'Hash' }
];

const TransferTable: FC<{
  where?: Record<string, unknown>;
  setCount?: Dispatch<SetStateAction<number | undefined>>;
}> = ({ where = {}, setCount: setCount }) => {
  const variables = useMemo(
    () => ({
      orderBy: [{ timestamp: 'desc' }],
      where
    }),
    [where]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<GetTransfersByBlock>(LIST_TRANSFERS_ORDERED, {
    variables
  });
  useEffect(() => {
    if (data?.agg && setCount) {
      setCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount]);

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={(data?.transfers || []).map(TransferRow)}
      footer={pagination.controls}
    />
  );
};

export default TransferTable;
