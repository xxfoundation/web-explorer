import type { AddressFilters } from '../../components/Tables/filters/AddressFilter';

import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TimeAgo from '../../components/TimeAgo';
import {
  GetTransfersByBlock,
  LIST_TRANSFERS_ORDERED,
  Transfer
} from '../../schemas/transfers.schema';
import { useQuery } from '@apollo/client';
import { usePagination } from '../../hooks';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';

const TransferRow = (data: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;
  return [
    { value: data.block.era },
    { value: <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link> },
    { value: <TimeAgo date={data.timestamp} /> },
    {
      value: (
        <Address
          name={data.sourceAccount.identity?.display}
          value={data.source}
          url={`/accounts/${data.source}`}
          truncated
        />
      )
    },
    {
      value: (
        <Address
          value={data.destination}
          name={data.destinationAccount.identity?.display}
          url={`/accounts/${data.destination}`}
          truncated
        />
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
    [statusFilter]
  );

  const { data, error, loading } = useQuery<GetTransfersByBlock>(LIST_TRANSFERS_ORDERED, {
    variables
  });

  const pagination = usePagination();
  const { paginate, reset, setCount: setPaginationCount } = pagination;

  const transfers = useMemo(() => {
    return (data?.transfers || [])
      .filter((t) => !filters?.from || t.source === filters?.from)
      .filter((t) => !filters?.to || t.destination === filters?.to);
  }, [data?.transfers, filters?.from, filters?.to]);

  useEffect(() => {
    setCount(transfers.length);
    setPaginationCount(transfers.length);
  }, [setCount, setPaginationCount, transfers.length]);

  useEffect(() => {
    reset();
  }, [filters, reset, statusFilter]);

  const paginated = useMemo(() => paginate(transfers), [paginate, transfers]);

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={paginated.map(TransferRow)}
      footer={pagination.controls}
    />
  );
};

export default TransferTable;
