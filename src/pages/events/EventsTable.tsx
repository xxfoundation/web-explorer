import { useQuery } from '@apollo/client';
import { Button, Skeleton, Stack, TableCellProps, Tooltip, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Link from '../../components/Link';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { Event, GetAvailableEventActions, GET_AVAILABLE_EVENT_ACTIONS, ListEvents, LIST_EVENTS } from '../../schemas/events.schema';
import { theme } from '../../themes/default';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';

const ROWS_PER_PAGE = 25;

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

  const headers = useMemo(() => [
    { value: 'event id' },
    { value: 'block number' },
    { value: (
      <DateRangeFilter onChange={setRange} value={range} />
    )},
    { value: <ValuesFilter availableValues={availableMethods} buttonLabel='Method' onChange={setMethodsFilter} value={methodsFilter} /> },
    { value: <ValuesFilter availableValues={availableCalls} buttonLabel='Call' onChange={setCallsFilter} value={callsFilter} /> },
  ], [availableCalls, availableMethods, callsFilter, methodsFilter, range]);

  const { cursorField, limit, makeOnPageChange, offset, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor<Event>({
      cursorField: 'id',
      rowsPerPage: 20
    });

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc', event_index: 'asc' }],
      limit: limit,
      offset: offset,
      where: {
        id: { _lte: cursorField },
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
      cursorField,
      limit,
      methodsFilter,
      offset,
      range.from,
      range.to
    ]
  );

  const { data, loading } = useQuery<ListEvents>(LIST_EVENTS, { variables });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);
  const footer = useMemo(() => {
    if (data?.agg && data?.events && data.events.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={makeOnPageChange(data.events[0])}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.events, makeOnPageChange, onRowsPerPageChange, page, rowsPerPage]);
  if (loading)
    return (
      <>
        <Skeleton width='12%' sx={{ marginBottom: '18px' }} />
        <TableSkeleton cells={headers.length} rows={rowsPerPage} />
      </>
    );
    
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
      <BaselineTable headers={headers} rows={rows} footer={footer} />
    </>
  );
};

export default HistoryTable;
