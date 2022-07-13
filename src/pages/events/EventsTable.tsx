import { useQuery } from '@apollo/client';
import { Stack, TableCellProps, Tooltip, Typography } from '@mui/material';
import FunctionsIcon from '@mui/icons-material/Functions';
import React, { useMemo, useState } from 'react';
import Link from '../../components/Link';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import {
  Event,
  GetAvailableEventActions,
  GET_AVAILABLE_EVENT_ACTIONS,
  ListEvents,
  LIST_EVENTS
} from '../../schemas/events.schema';
import { theme } from '../../themes/default';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';

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

const HistoryTable = () => {
  const [range, setRange] = useState<Range>({
    from: null,
    to: null
  });

  const actionsQuery = useQuery<GetAvailableEventActions>(GET_AVAILABLE_EVENT_ACTIONS);

  const [modulesFilter, setModulesFilter] = useState<string[]>();
  const availableModules = useMemo(
    () => actionsQuery.data?.modules.map((m) => m.module),
    [actionsQuery.data]
  );

  const [callsFilter, setCallsFilter] = useState<string[]>();
  const availableCalls = useMemo(
    () => actionsQuery.data?.calls.map((c) => c.call),
    [actionsQuery.data]
  );

  const headers = useMemo(
    () => [
      { value: 'event id' },
      { value: 'block number' },
      { value: <DateRangeFilter onChange={setRange} value={range} /> },
      {
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
        value: (
          <ValuesFilter
            availableValues={availableCalls}
            buttonLabel='Event'
            onChange={setCallsFilter}
            value={callsFilter}
          />
        )
      }
    ],
    [availableCalls, availableModules, callsFilter, modulesFilter, range]
  );

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc' }, { event_index: 'asc' }],
      where: {
        timestamp: {
          ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
          ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
        },
        ...(modulesFilter && modulesFilter.length > 0 && { module: { _in: modulesFilter } }),
        ...(callsFilter && callsFilter.length > 0 && { call: { _in: callsFilter } })
      }
    }),
    [callsFilter, modulesFilter, range.from, range.to]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ListEvents>(LIST_EVENTS, {
    variables
  });
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
          <div style={{ margin: '0 0 1em 0', display: 'inline-flex' }}>
            <FunctionsIcon />
            <Tooltip title='Total Number of Events' placement='top' arrow>
              <Typography>= {data.agg.aggregate.count}</Typography>
            </Tooltip>
          </div>
        </Stack>
      )}
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

export default HistoryTable;
