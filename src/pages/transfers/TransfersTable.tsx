import type { AddressFilters } from '../../components/Tables/filters/AddressFilter';

import { Box, Typography } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useSubscription } from '@apollo/client';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TimeAgo from '../../components/TimeAgo';
import RefreshButton from '../../components/buttons/Refresh';
import {
  GetTransfersByBlock,
  LIST_TRANSFERS_ORDERED,
  SubscribeTransfersSinceBlock,
  SUBSCRIBE_TRANSFERS_SINCE_BLOCK,
  Transfer
} from '../../schemas/transfers.schema';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';

const TransferRow = (data: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;
  return [
    { value: <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link> },
    { value: <TimeAgo date={data.timestamp} /> },
    {
      value: (
        <Address
          name={data.sourceAccount.identity?.display}
          value={data.source}
          url={`/accounts/${data.source}`}
          truncated />
      )
    },
    {
      value: (
        <Address
          value={data.destination}
          name={data.destinationAccount.identity?.display}
          url={`/accounts/${data.destination}`}
          truncated />
      )
    },
    { value: <FormatBalance value={data.amount.toString()} /> },
    { value: <BlockStatusIcon status={data.success ? 'successful' : 'failed'} /> },
    { value: <Hash truncated value={data.hash} url={extrinsicIdLink} showTooltip /> }
  ];
};

type Props = {
  filters?: AddressFilters;
  where?: Record<string, unknown>;
  setCount?: Dispatch<SetStateAction<number | undefined>>;
};

const TransferTable: FC<Props> = ({ filters, where = {}, setCount = () => {} }) => {
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const whereWithFilters = useMemo(
    () =>
      statusFilter !== null && {
        success: { _eq: statusFilter }
      },
    [statusFilter]
  );
  const whereConcat = useMemo(
    () => Object.assign({}, where, whereWithFilters),
    [where, whereWithFilters]
  );
  const variables = useMemo(
    () => ({
      orderBy: [{ timestamp: 'desc' }],
      where: whereConcat
    }),
    [whereConcat]
  );

  const headers = useMemo(
    () =>
      BaseLineCellsWrapper([
        'Block',
        'Time',
        <Typography>From</Typography>,
        <Typography>To</Typography>,
        'Amount',
        <BooleanFilter
          label='Result'
          onChange={setStatusFilter}
          toggleLabel={(v) => (v ? 'Successful' : 'Failed')}
          value={statusFilter}
        />,
        'Hash'
      ]),
    [statusFilter]
  );

  const { data, error, loading, pagination, refetch  } = usePaginatedQuery<GetTransfersByBlock>(LIST_TRANSFERS_ORDERED, {
    variables
  });

  const { paginate, reset } = pagination;

  const transfers = useMemo(() => {
    return (data?.transfers || [])
      .filter((t) => !filters?.from || t.source === filters?.from)
      .filter((t) => !filters?.to || t.destination === filters?.to);
  }, [data?.transfers, filters?.from, filters?.to]);

  useEffect(() => {
    setCount(pagination.count);
  }, [pagination.count, setCount]);

  useEffect(() => {
    reset();
  }, [filters, reset, statusFilter]);

  const paginated = useMemo(() => paginate(transfers), [paginate, transfers]);

  const [latestTransferBlock, setLatestTransferBlock] = useState<number>();

  useEffect(() => {
    setLatestTransferBlock(data?.transfers[0]?.blockNumber);
  }, [data?.transfers]);

  const transfersSinceBlock = useSubscription<SubscribeTransfersSinceBlock>(SUBSCRIBE_TRANSFERS_SINCE_BLOCK, {
    skip: latestTransferBlock === undefined,
    variables: {
      blockNumber: latestTransferBlock
    }
  });

  const transfersSinceFetch = transfersSinceBlock?.data?.transfers?.aggregate?.count;

  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        {data?.transfers && <RefreshButton
          countSince={transfersSinceFetch}
          refetch={refetch}
        />}
      </Box>
      <BaselineTable
        error={!!error}
        loading={loading}
        headers={headers}
        rowsPerPage={pagination.rowsPerPage}
        rows={paginated.map(TransferRow)}
        footer={pagination.controls}
      />
    </>
  );
};

export default TransferTable;
