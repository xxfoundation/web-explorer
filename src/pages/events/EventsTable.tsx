import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TableCellProps,
  Tooltip,
  Typography
} from '@mui/material';
import FunctionsIcon from '@mui/icons-material/Functions';
import React, {useEffect, useMemo, useState} from 'react';
import Link from '../../components/Link';
import { BaselineCell, BaselineTable, HeaderCell } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import RefreshButton from '../../components/buttons/Refresh';
import {
  Event,
  GetAvailableEventActions,
  GET_AVAILABLE_EVENT_ACTIONS,
  ListEvents,
  LIST_EVENTS,
  SubscribeEventsSinceBlock,
  SUBSCRIBE_EVENTS_SINCE_BLOCK, GET_CALLS_FOR_MODULES_ACTIONS, GetCallsForModules
} from '../../schemas/events.schema';
import { theme } from '../../themes/default';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import useSessionState from '../../hooks/useSessionState';

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ blockNumber, call, index, module, timestamp }: Event): BaselineCell[] => {
  return [
    { value: index, props },
    { value: <Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link> },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${module}` },
    { value: `${call}` }
  ];
};

const EventsTable = () => {
  /* ----------------- Query Available Extrinsic Module/Calls ----------------- */
  const actionsQuery = useQuery<GetAvailableEventActions>(GET_AVAILABLE_EVENT_ACTIONS);
  const [fetchCalls, {data: callsQuery}] = useLazyQuery<GetCallsForModules>(GET_CALLS_FOR_MODULES_ACTIONS,);

  /* ----------------------- Initialize State Variables ----------------------- */
  const [range, setRange] = useSessionState<Range>('events.range', {
    from: null,
    to: null
  });

  const [withExtrinsicSuccess, setWithExtrinsicSuccess] = useSessionState<boolean>(
    'events.success',
    false
  );

  const [modulesFilter, setModulesFilter] = useSessionState<string[] | undefined>(
    'events.modules',
    undefined
  );
  
  const [callsFilter, setCallsFilter] = useSessionState<string[] | undefined>(
    'events.calls',
    undefined
  );
  
  useEffect(() => {
    if(modulesFilter) {
      setCallsFilter([])
      fetchCalls({
        variables: {
          where: {
            module: {
              _in: modulesFilter
            }
          }
        }
      })
    }
    // Would like to call this function only when the modulesFilter is updated 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modulesFilter])
  
  /* --------------------- Initialize Dependent Variables --------------------- */
  const availableModules = useMemo(
    () => actionsQuery.data?.modules.map((m) => m.module),
    [actionsQuery.data]
  );
  const availableCalls = useMemo(
    () => callsQuery?.calls.map((c) => c.call),
    [callsQuery]
  );
  const callVariable = useMemo(() => {
    const conditions = [];
    if (!withExtrinsicSuccess) {
      conditions.push({ call: { _neq: 'ExtrinsicSuccess' } });
    }
    if (callsFilter && callsFilter.length > 0) {
      conditions.push({ call: { _in: callsFilter } });
    }
    return conditions;
  }, [withExtrinsicSuccess, callsFilter]);

  const where = useMemo(() => {
    return {
      timestamp: {
        ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
        ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
      },
      ...{ _and: callVariable },
      ...(modulesFilter && modulesFilter.length > 0 && { module: { _in: modulesFilter } })
    };
  }, [range.from, range.to, callVariable, modulesFilter]);

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
      {
        label: 'Time',
        value: <DateRangeFilter onChange={setRange} value={range} />
      },
      {
        label: 'Module',
        value: (
          <ValuesFilter
            availableValues={availableModules}
            buttonLabel='Module'
            onChange={setModulesFilter}
            value={modulesFilter}
          />
        )
      },
      {
        label: 'Event',
        value: (
          <ValuesFilter
            availableValues={availableCalls}
            buttonLabel='Event'
            onChange={setCallsFilter}
            value={callsFilter}
            disabled={!modulesFilter || modulesFilter?.length === 0}
          />
        )
      }
    ],
    [
      availableCalls,
      availableModules,
      callsFilter,
      modulesFilter,
      range,
      setCallsFilter,
      setModulesFilter,
      setRange
    ]
  );

  /* ------------------------- Main Query - Get Events ------------------------ */
  const { data, error, loading, pagination, refetch } = usePaginatedQuery<ListEvents>(LIST_EVENTS, {
    variables
  });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);

  /* ---------------------------- Setup Pagination ---------------------------- */
  const { reset } = pagination;
  useEffect(() => {
    reset();
  }, [range, modulesFilter, withExtrinsicSuccess, callsFilter, reset]);

  /* ----------------------------- Refresh Button ----------------------------- */
  const [latestEventBlock, setLatestEventBlock] = useState<number>();
  useEffect(() => {
    setLatestEventBlock(data?.events[0]?.blockNumber);
  }, [data?.events]);

  const subscribeVariables = useMemo(
    () => ({
      where: { ...where, ...{ block_number: { _gt: latestEventBlock } } }
    }),
    [latestEventBlock, where]
  );
  const eventsSinceLastFetch = useSubscription<SubscribeEventsSinceBlock>(
    SUBSCRIBE_EVENTS_SINCE_BLOCK,
    {
      skip: latestEventBlock === undefined,
      variables: subscribeVariables
    }
  );
  const eventsSinceFetch = eventsSinceLastFetch?.data?.events?.aggregate?.count;

  /* ----------------------------- Build Component ---------------------------- */
  return (
    <>
      {data?.agg.aggregate.count !== undefined && (
        <Stack
          direction='row'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
          marginBottom='18px'
          fontSize={'16px'}
          fontWeight={700}
          color={theme.palette.grey[600]}
        >
          <div style={{ margin: '0 0 1em 0', display: 'inline-flex' }}>
            <FunctionsIcon />
            <Tooltip title='Total Number of Events' placement='top' arrow>
              <Typography>= {data.agg.aggregate.count}</Typography>
            </Tooltip>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={withExtrinsicSuccess}
                onChange={() => setWithExtrinsicSuccess(!withExtrinsicSuccess)}
              />
            }
            label={'system(ExtrinsicSuccess)'}
          />
        </Stack>
      )}
      <Box sx={{ textAlign: 'right' }}>
        {data?.events && <RefreshButton countSince={eventsSinceFetch} refetch={refetch} />}
      </Box>
      <BaselineTable
        error={!!error}
        loading={loading}
        headers={headers}
        rows={rows}
        rowsPerPage={pagination.rowsPerPage}
        footer={pagination.controls}
      />
    </>
  );
};

export default EventsTable;
