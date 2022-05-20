import { useQuery } from '@apollo/client';
import { TableCellProps, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { usePaginator } from '../../hooks/usePaginatiors';
import { LIST_EVENTS_OF_BLOCK } from '../../schemas/events.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaselineCell, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';

type EventType = {
  id: number;
  hash?: string;
  section: string;
  method: string;
  blockNumber: number;
  timestamp: number;
};

type Response = { events: EventType[] };

const HashCell: FC<{ value?: string }> = ({ value }) => {
  if (!value) {
    return <Typography>-</Typography>;
  }
  return <Hash value={value} truncated showTooltip />;
};

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ hash, id, method, section }: EventType): BaselineCell[] => {
  return [
    { value: id, props },
    { value: <HashCell value={hash} />, props },
    { value: <Link to='#' textTransform={'capitalize'}>{`${method} (${section})`}</Link> }
  ];
};

const headers = [{ value: 'event id', props }, { value: 'hash', props }, { value: 'action' }];

const EventsTable: FC<{ where: unknown }> = ({ where }) => {
  const paginator = usePaginator({ rowsPerPage: 4 });
  const { data, loading } = useQuery<Response>(LIST_EVENTS_OF_BLOCK, {
    variables: {
      orderBy: [
        {
          event_index: 'desc'
        }
      ],
      limit: paginator.rowsPerPage,
      offset: paginator.page * paginator.rowsPerPage,
      where
    }
  });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);

  if (loading) return <TableSkeleton rows={4} cells={4} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          page={paginator.page}
          count={data?.events.length || 0}
          rowsPerPage={paginator.rowsPerPage}
          onPageChange={paginator.onPageChange}
          rowsPerPageOptions={[2, 4, 6]}
          onRowsPerPageChange={paginator.onRowsPerPageChange}
        />
      }
    />
  );
};

export default EventsTable;
