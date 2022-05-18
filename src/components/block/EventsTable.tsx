import { useQuery } from '@apollo/client';
import { TableCellProps, Tooltip, Typography } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { EVENTS_OF_BLOCK } from '../../schemas/events.schema';
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
  return (
    <Tooltip
      title={
        <Typography fontSize={'10px'} fontWeight={400}>
          {value}
        </Typography>
      }
      placement={'top'}
      arrow
    >
      <span>
        <Hash value={value} truncated />
      </span>
    </Tooltip>
  );
};

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ hash, id, method, section }: EventType): BaselineCell[] => {
  return [
    { value: id, props },
    { value: <HashCell value={hash} />, props },
    { value: <Link to='#' textTransform={'capitalize'}>{`${section} (${method})`}</Link> }
  ];
};

const headers = [{ value: 'event id', props }, { value: 'hash', props }, { value: 'action' }];

const EventsTable: FC<{ where: unknown }> = ({ where }) => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);
  const variables = useMemo(() => {
    return {
      orderBy: [
        {
          event_index: 'desc'
        }
      ],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where
    };
  }, [page, rowsPerPage, where]);
  const { data, loading } = useQuery<Response>(EVENTS_OF_BLOCK, {
    variables
  });
  const rows = useMemo(() => (data?.events || []).map(rowsParser), [data]);

  if (loading) return <TableSkeleton rows={4} cells={4} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          page={page}
          count={data?.events.length || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[2, 4, 6]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
    />
  );
};

export default EventsTable;
