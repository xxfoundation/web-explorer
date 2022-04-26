import { useQuery } from '@apollo/client';
import { TableCellProps, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { EVENTS_OF_BLOCK } from '../../schemas/events.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaselineCell, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';

type EventType = {
  id: string;
  hash?: string;
  section: string;
  method: string;
};

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

const EventsTable: FC<{ where: unknown }> = ({ where }) => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const { data, loading } = useQuery<{ events: EventType[] }>(EVENTS_OF_BLOCK, {
    variables: {
      orderBy: [
        {
          event_index: 'desc'
        }
      ],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where
    }
  });
  if (loading) return <TableSkeleton rows={4} cells={4} footer />;
  return (
    <BaselineTable
      headers={[{ value: 'event id', props }, { value: 'hash', props }, { value: 'action' }]}
      rows={(data?.events || []).map(rowsParser)}
      footer={
        <TablePagination
          page={page}
          count={data?.events.length || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={(_: unknown, number: number) => {
            setPage(number);
          }}
          rowsPerPageOptions={[2, 4, 6]}
          onRowsPerPageChange={({ target: { value } }) => {
            setRowsPerPage(parseInt(value));
            setPage(0);
          }}
        />
      }
    />
  );
};

export default EventsTable;
