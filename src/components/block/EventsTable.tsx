import { useQuery } from '@apollo/client';
import { TableCellProps } from '@mui/material';
import React, { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { EVENTS_OF_BLOCK, ListEvents, Event } from '../../schemas/events.schema';
import { BaselineCell, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';
import Error from '../../components/Error';

const ROWS_PER_PAGE = 5;

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ blockNumber, index, method, section, timestamp }: Event): BaselineCell[] => {
  return [
    { value: `${blockNumber}-${index}`, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${section} (${method})` }
  ];
};

const paginate = (events: Event[], rowsPerPage: number, page: number): Event[] => {
  // page starts at 0
  return events.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
};

const headers = [{ value: 'event id', props }, { value: 'time' }, { value: 'action' }];

const EventsTable: FC<{ where: Record<string, unknown>; setCount?: (count: number) => void }> = ({
  where,
  setCount = () => {}
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);

  // Query data from DB
  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc', event_index: 'asc' }],
      where: {
        ...where
      }
    }),
    [where]
  );
  const { data, error, loading } = useQuery<ListEvents>(EVENTS_OF_BLOCK, { variables });

  // Display Data in Paginated Table
  const rows = useMemo(() => {
    return paginate(data?.events || [], rowsPerPage, page).map(rowsParser);
  }, [data?.events, page, rowsPerPage]);

  // Update count
  useEffect(() => {
    if (setCount !== undefined && data?.agg) {
      setCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount]);

  // Return rendering components
  const footer = useMemo(() => {
    if (data?.agg && data?.events && data.events.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.events, onPageChange, onRowsPerPageChange, page, rowsPerPage]);

  if (error) return <Error type='data-unavailable' />;
  if (loading) return <TableSkeleton rows={rowsPerPage} cells={3} footer />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default EventsTable;
