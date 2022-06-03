import { useQuery } from '@apollo/client';
import { TableCellProps } from '@mui/material';
import React, { FC, useEffect, useMemo } from 'react';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { LIST_EVENTS } from '../../schemas/events.schema';
import { TotalOfItems } from '../../schemas/types';
import { BaselineCell, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';

const DEFAULT_ROWS_PER_PAGE = 5;

type EventType = {
  id: number;
  index: number;
  section: string;
  method: string;
  blockNumber: number;
  timestamp: number;
};

type Response = { events: EventType[] } & TotalOfItems;

const props: TableCellProps = { align: 'left' };

const rowsParser = ({
  blockNumber,
  index,
  method,
  section,
  timestamp
}: EventType): BaselineCell[] => {
  return [
    { value: `${blockNumber}-${index}`, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${section} (${method})` }
  ];
};

const headers = [{ value: 'event id', props }, { value: 'time' }, { value: 'action' }];

const EventsTable: FC<{ where: Record<string, unknown>; setCount?: (count: number) => void }> = ({
  where,
  setCount = () => {}
}) => {
  const { cursorField, limit, offset, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor({ rowsPerPage: DEFAULT_ROWS_PER_PAGE, cursorField: 'id' });
  const variables = useMemo(
    () => ({
      orderBy: [{ id: 'desc' }],
      limit: limit,
      offset: offset,
      where: {
        ...where,
        id: { _lte: cursorField }
      }
    }),
    [cursorField, limit, offset, where]
  );
  const { data, loading } = useQuery<Response>(LIST_EVENTS, { variables });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);
  useEffect(() => {
    if (setCount !== undefined && data?.agg) {
      setCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount]);
  const footer = useMemo(() => {
    if (data?.agg && data?.events && data.events.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.events[0])}
          rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, 20, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.events, onPageChange, onRowsPerPageChange, page, rowsPerPage]);

  if (loading) return <TableSkeleton rows={rowsPerPage} cells={3} footer />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default EventsTable;
