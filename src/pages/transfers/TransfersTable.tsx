import type { AddressFilters } from '../../components/Tables/filters/AddressFilter';

import { Box } from '@mui/material';
import { useSubscription } from '@apollo/client';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
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
import useSessionState from '../../hooks/useSessionState';

const TransferRow = (data: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;

  return BaseLineCellsWrapper([
    <>{data.block.era}</>,
    <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link>,
    <TimeAgo date={data.timestamp} />,
    <Address
      name={data.sourceAccount.identity?.display}
      value={data.source}
      url={`/accounts/${data.source}`}
      truncated
    />,
    <Address
      value={data.destination}
      name={data.destinationAccount.identity?.display}
      url={`/accounts/${data.destination}`}
      truncated
    />,
    <FormatBalance value={data.amount.toString()} />,
    <BlockStatusIcon status={data.success ? 'successful' : 'failed'} />,
    <Hash truncated value={data.hash} url={extrinsicIdLink} showTooltip />
  ]);
};

type Props = {
  filters?: AddressFilters;
  where?: Record<string, unknown>;
  setCount?: Dispatch<SetStateAction<number | undefined>>;
};

const TransferTable: FC<Props> = ({ filters, where = {}, setCount = () => {} }) => {
  /* ----------------------- Initialize State Variables ----------------------- */
  const [statusFilter, setStatusFilter] = useSessionState<boolean | null>('transfers.status', null);

  /* --------------------- Initialize Dependent Variables --------------------- */
  const whereWithFilters = useMemo(() => {
    return {
      ...(statusFilter !== null && {
        success: { _eq: statusFilter }
      }),
      ...(filters?.from && {
        source: { _eq: filters?.from }
      }),
      ...(filters?.to && {
        destination: { _eq: filters?.to }
      })
    };
  }, [filters?.from, filters?.to, statusFilter]);
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

  /* --------------------------------- Headers -------------------------------- */
  const headers = useMemo(
    () =>
      BaseLineCellsWrapper([
        'Era',
        'Block',
        'Time',
        'From',
        'To',
        'Amount',
        <BooleanFilter
          label='Result'
          onChange={setStatusFilter}
          toggleLabel={(v) => (v ? 'Successful' : 'Failed')}
          value={statusFilter}
        />,
        'Hash'
      ]),
    [setStatusFilter, statusFilter]
  );

  /* ----------------------- Main Query - Get Transfers ----------------------- */
  const { data, error, loading, pagination, refetch } = usePaginatedQuery<GetTransfersByBlock>(
    LIST_TRANSFERS_ORDERED,
    {
      variables
    }
  );
  const rows = useMemo(() => (data?.transfers || []).map(TransferRow), [data?.transfers]);

  /* ---------------------------- Setup Pagination ---------------------------- */
  const { reset } = pagination;
  useEffect(() => {
    setCount(pagination.count);
  }, [pagination.count, setCount]);

  useEffect(() => {
    reset();
  }, [filters, reset, statusFilter]);

  /* ----------------------------- Refresh Button ----------------------------- */
  const [latestTransferBlock, setLatestTransferBlock] = useState<number>();
  useEffect(() => {
    setLatestTransferBlock(data?.transfers[0]?.blockNumber);
  }, [data?.transfers]);

  const transfersSinceBlock = useSubscription<SubscribeTransfersSinceBlock>(
    SUBSCRIBE_TRANSFERS_SINCE_BLOCK,
    {
      skip: latestTransferBlock === undefined,
      variables: {
        where: { whereConcat, ...{ block_number: { _gt: latestTransferBlock } } }
      }
    }
  );
  const transfersSinceFetch = transfersSinceBlock?.data?.transfers?.aggregate?.count;

  /* ----------------------------- Build Component ---------------------------- */
  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        {data?.transfers && <RefreshButton countSince={transfersSinceFetch} refetch={refetch} />}
      </Box>
      <BaselineTable
        error={!!error}
        loading={loading}
        headers={headers}
        rowsPerPage={pagination.rowsPerPage}
        rows={rows}
        footer={pagination.controls}
      />
    </>
  );
};

export default TransferTable;
