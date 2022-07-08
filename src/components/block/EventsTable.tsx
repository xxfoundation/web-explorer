import { useQuery } from '@apollo/client';
import { TableCellProps } from '@mui/material';
import React, { FC, useEffect, useMemo } from 'react';
import { EVENTS_OF_BLOCK, ListEvents, Event } from '../../schemas/events.schema';
import { BaselineCell, BaselineTable } from '../Tables';
import TimeAgoComponent from '../TimeAgo';
import { usePagination } from '../../hooks';

const ROWS_PER_PAGE = 5;

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ blockNumber, index, method, section, timestamp }: Event): BaselineCell[] => {
  return [
    { value: `${blockNumber}-${index}`, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${section} (${method})` }
  ];
};

const headers = [{ value: 'event id', props }, { value: 'time' }, { value: 'action' }];

type Props = {
  setCount?: (count: number) => void;
  where: Record<string, unknown>
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
      footer={pagination.controls} />
  );
};

export default EventsTable;
