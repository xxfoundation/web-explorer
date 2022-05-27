import { useQuery } from '@apollo/client';
import { Button, Stack, TableCellProps, Tooltip, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { Event, ListEvents, LIST_EVENTS } from '../../schemas/events.schema';
import { theme } from '../../themes/default';

const headers = [
  { value: 'event id' },
  { value: 'block number' },
  { value: 'extrinsics hash' },
  { value: 'time' },
  { value: 'action' }
];

const props: TableCellProps = { align: 'left' };

const rowsParser = ({ blockNumber, index, method, section, timestamp }: Event): BaselineCell[] => {
  return [
    { value: `${blockNumber}-${index}`, props },
    { value: blockNumber },
    { value: <Hash value={''} truncated showTooltip />, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: <Link to='#' textTransform={'capitalize'}>{`${section} (${method})`}</Link> }
  ];
};

const HistoryTable = () => {
  const { cursorField, limit, offset, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor<Event>({
      cursorField: 'timestamp',
      rowsPerPage: 20
    });

  const variables = useMemo(
    () => ({
      orderBy: [{ timestamp: 'desc' }],
      limit: limit,
      offset: offset,
      where: { timestamp: { _lte: cursorField } }
    }),
    [cursorField, limit, offset]
  );

  const { data, loading } = useQuery<ListEvents>(LIST_EVENTS, { variables });
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
  if (loading) return <TableSkeleton cells={6} rows={20} />;
  return (
    <>
      {data?.agg.aggregate.count && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          marginBottom='18px'
          fontSize={'16px'}
          fontWeight={700}
          color={theme.palette.grey[600]}
        >
          <Button color='inherit' disabled>
            Filter all
          </Button>
          <Typography>|</Typography>
          <Tooltip title='the total of events' placement='top' arrow>
            <Typography> {data.agg.aggregate.count}</Typography>
          </Tooltip>
        </Stack>
      )}
      <BaselineTable headers={headers} rows={rows} footer={footer} />
    </>
  );
};

export default HistoryTable;
