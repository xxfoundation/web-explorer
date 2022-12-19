import {
  TableCellProps,
} from '@mui/material';
import React, { useMemo } from 'react';
import Link from '../../../../components/Link';
import { BaselineCell, BaselineTable, HeaderCell } from '../../../../components/Tables';
import TimeAgoComponent from '../../../../components/TimeAgo';
import {
  Event,
  ListStakingEvents, LIST_STAKING_EVENTS
} from '../../../../schemas/events.schema';
import usePaginatedQuery from '../../../../hooks/usePaginatedQuery';
import FormatBalance from '../../../../components/FormatBalance';

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ amount, blockNumber, call, index, timestamp }: Event): BaselineCell[] => {
  return [
    { value: index, props },
    { value: <Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link> },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${call}` },
    { value: <FormatBalance value={amount?.toString() || ''} precision={4} /> }
  ];
};

interface IStakingEventsTable {
  accountId: string
}

const StakingEventsTable: React.FC<IStakingEventsTable> = ({accountId}) => {
  const where = useMemo(() => {
    return {
      ...{account_id: { _eq: accountId}, module: {_eq: 'staking'}}
    };
  }, [accountId]);

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc' }, { event_index: 'asc' }],
      where: where
    }),
    [where]
  );

  /* --------------------------------- Headers -------------------------------- */
  const headers = useMemo<HeaderCell[]>(
    () => [
      { value: 'event id' },
      { value: 'block number' },
      {value: 'Time'},
      {value: 'Call'},
      {value: 'Amount'}
    ],
    []
  );

  /* ------------------------- Main Query - Get `balances` Events ------------------------ */
  const { data, error, loading, pagination } = usePaginatedQuery<ListStakingEvents>(LIST_STAKING_EVENTS, {
    variables
  });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);
  
  /* ----------------------------- Build Component ---------------------------- */
  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rows={rows}
      rowsPerPage={pagination.rowsPerPage}
      footer={pagination.controls}
    />
  );
};

export default StakingEventsTable;
