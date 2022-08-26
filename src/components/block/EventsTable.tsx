import { useQuery } from '@apollo/client';
import { Box, Stack, TableCellProps } from '@mui/material';
import React, { FC, useEffect, useMemo } from 'react';
import { EVENTS_OF_BLOCK, ListEvents, Event } from '../../schemas/events.schema';
import { BaselineCell, BaselineTable } from '../Tables';
import TimeAgoComponent from '../TimeAgo';
import { usePagination } from '../../hooks';
import { theme } from '../../themes/default';

const ROWS_PER_PAGE = 10;

const props: TableCellProps = { align: 'left' };

const DataTile: FC<{ headers?: string[]; values: string[] }> = ({ headers, values }) => {
  return (
    <Stack
      sx={{
        margin: '0.25em',
        borderColor: theme.palette.grey['200'],
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '1px'
      }}
    >
      {values.map((value, index) => (
        <Box
          key={index}
          component={'pre'}
          sx={{
            margin: '0.5em',
            padding: '0.25em',
            maxHeight: '70px',
            overflowY: 'auto',
            background: 'rgb(0 0 0 / 4%)'
          }}
        >
          {headers && headers.length === values.length && (
            <>
              <b>{headers[index]}</b>
              {': '}
            </>
          )}
          {JSON.stringify(value, null, 2)}
        </Box>
      ))}
    </Stack>
  );
};

const processEventDoc = (doc: string) => {
  const substring = doc.substring(doc.indexOf('\\[') + 2, doc.lastIndexOf('\\') - 1);
  return substring ? substring.replace(/,","/g, ' ').replace(/,/g, '').split(' ') : undefined;
};

const rowsParser = ({
  blockNumber,
  call,
  data,
  doc,
  index,
  module,
  timestamp
}: Event): BaselineCell[] => {
  return [
    { value: `${blockNumber}-${index}`, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${module} (${call})` },
    { value: <DataTile headers={processEventDoc(doc)} values={JSON.parse(data)} /> }
  ];
};

const headers = [
  { value: 'event id', props },
  { value: 'time' },
  { value: 'action' },
  { value: 'data' }
];

type Props = {
  setCount?: (count: number) => void;
  where: Record<string, unknown>;
};

const EventsTable: FC<Props> = ({ setCount = () => {}, where }) => {
  const pagination = usePagination({ rowsPerPage: ROWS_PER_PAGE });
  const { paginate, setCount: setPaginationCount } = pagination;

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc', event_index: 'asc' }],
      where
    }),
    [where]
  );
  const { data, error, loading } = useQuery<ListEvents>(EVENTS_OF_BLOCK, { variables });

  const rows = useMemo(() => {
    return paginate(data?.events || []).map(rowsParser);
  }, [data?.events, paginate]);

  useEffect(() => {
    if (data?.agg) {
      setCount(data.agg.aggregate.count);
      setPaginationCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount, setPaginationCount]);

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={rows}
      footer={pagination.controls}
    />
  );
};

export default EventsTable;
