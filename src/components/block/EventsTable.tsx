import { useQuery } from '@apollo/client';
import { TableCellProps } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { LIST_EVENTS } from '../../schemas/events.schema';
import { TotalOfItems } from '../../schemas/types';
import { BaselineCell, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';

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

const rowsParser = ({ index, method, section, timestamp }: EventType): BaselineCell[] => {
  return [
    { value: index, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${section} (${method})` }
  ];
};

const headers = [{ value: 'event id', props }, { value: 'time' }, { value: 'action' }];

const EventsTable: FC<{ where: Record<string, unknown> }> = ({ where }) => {
  const { cursorField, limit, offset, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor({ rowsPerPage: 4, cursorField: 'id' });
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
  const footer = useMemo(() => {
    if (data?.agg && data?.events && data.events.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.events[0])}
          rowsPerPageOptions={[2, 4, 6]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.events, onPageChange, onRowsPerPageChange, page, rowsPerPage]);

  if (loading) return <TableSkeleton rows={4} cells={4} footer />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default EventsTable;
