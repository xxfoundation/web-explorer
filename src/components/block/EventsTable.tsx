import { useQuery } from '@apollo/client';
import { TableCellProps, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { LIST_EVENTS_OF_BLOCK } from '../../schemas/events.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaselineCell, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';

type EventType = {
  id: number;
  index: number;
  hash?: string;
  section: string;
  method: string;
  blockNumber: number;
  timestamp: number;
};

type Response = { events: EventType[]; agg: { aggregate: { count: number } } };

const HashCell: FC<{ value?: string }> = ({ value }) => {
  if (!value) {
    return <Typography>-</Typography>;
  }
  return <Hash value={value} truncated showTooltip />;
};

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ hash, index, method, section }: EventType): BaselineCell[] => {
  return [
    { value: index, props },
    { value: <HashCell value={hash} />, props },
    { value: <Link to='#' textTransform={'capitalize'}>{`${section} (${method})`}</Link> }
  ];
};

const headers = [{ value: 'event id', props }, { value: 'hash', props }, { value: 'action' }];

const EventsTable: FC<{ where: Record<string, unknown> }> = ({ where }) => {
  const { cursorField, ...paginator } = usePaginatorByCursor({ rowsPerPage: 4, cursorField: 'id' });
  const variables = useMemo(
    () => ({
      orderBy: [{ id: 'desc' }],
      limit: paginator.rowsPerPage,
      offset: paginator.page * paginator.rowsPerPage,
      where: {
        ...where,
        id: { _lte: cursorField }
      },
      eventAggWhere: where
    }),
    [cursorField, paginator.page, paginator.rowsPerPage, where]
  );
  const { data, loading } = useQuery<Response>(LIST_EVENTS_OF_BLOCK, { variables });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);

  if (loading) return <TableSkeleton rows={4} cells={4} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          page={paginator.page}
          count={data?.agg.aggregate.count || 0}
          rowsPerPage={paginator.rowsPerPage}
          onPageChange={paginator.onPageChange(data?.events.at(0))}
          rowsPerPageOptions={[2, 4, 6]}
          onRowsPerPageChange={paginator.onRowsPerPageChange}
        />
      }
    />
  );
};

export default EventsTable;
