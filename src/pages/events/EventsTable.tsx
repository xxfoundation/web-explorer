import { useQuery } from '@apollo/client';
import { Button, Stack, TableCellProps, Tooltip, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Link from '../../components/Link';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import { Event, GetAvailableEventActions, GET_AVAILABLE_EVENT_ACTIONS, ListEvents, LIST_EVENTS } from '../../schemas/events.schema';
import { theme } from '../../themes/default';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ blockNumber, index, method, section, timestamp }: Event): BaselineCell[] => {
  return [
    { value: index, props },
    { value: <Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link> },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${method}` },
    { value: `${section}`}
  ];
};

const HistoryTable = () => {
  const [range, setRange] = useState<Range>({
    from: null,
    to: null
  });

  const actionsQuery = useQuery<GetAvailableEventActions>(GET_AVAILABLE_EVENT_ACTIONS);
  
  const [methodsFilter, setMethodsFilter] = useState<string[]>();
  const availableMethods = useMemo(
    () => actionsQuery.data?.methods.map((m) => m.method),
    [actionsQuery.data]
  )

  const [callsFilter, setCallsFilter] = useState<string[]>();
  const availableCalls = useMemo(
    () => actionsQuery.data?.calls.map((c) => c.section),
    [actionsQuery.data]
  );

  const headers = useMemo(
    () => [
      { value: 'event id' },
      { value: 'block number' },
      { value: (
        <DateRangeFilter onChange={setRange} value={range} />
      )},
      { value: <ValuesFilter availableValues={availableMethods} buttonLabel='Method' onChange={setMethodsFilter} value={methodsFilter} /> },
      { value: <ValuesFilter availableValues={availableCalls} buttonLabel='Call' onChange={setCallsFilter} value={callsFilter} /> },
    ],
    [availableCalls, availableMethods, callsFilter, methodsFilter, range]
  );

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc', event_index: 'asc' }],
      where: {
        timestamp: {
          ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
          ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
        },
        ...(methodsFilter && methodsFilter.length > 0 && ({ method: { _in: methodsFilter }})),
        ...(callsFilter && callsFilter.length > 0 && ({ section: { _in: callsFilter }}))
      }
    }),
    [
      callsFilter,
      methodsFilter,
      range.from,
      range.to
    ]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ListEvents>(LIST_EVENTS, { variables });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);

  // eslint-disable-next-line no-console
  console.log(error);
  return (
    <>
      {data?.agg.aggregate.count !== undefined && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          marginBottom='18px'
          fontSize={'16px'}
          fontWeight={700}
          color={theme.palette.grey[600]}
        >
          <Button color='inherit' disabled>
            Filter all
          </Button>
          <Typography>|</Typography>
          <Tooltip title='the total of events' placement='top' arrow>
            <Typography>{data.agg.aggregate.count}</Typography>
          </Tooltip>
        </Stack>
      )}
      <BaselineTable
        error={!!error}
        loading={loading}
        headers={headers}
        rows={rows}
        rowsPerPage={pagination.rowsPerPage}
        footer={pagination.controls} />
    </>
  );
};

export default HistoryTable;
