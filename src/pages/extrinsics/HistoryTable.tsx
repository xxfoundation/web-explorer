import { useQuery } from '@apollo/client';
import React, { useCallback, useMemo, useState } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { ListExtrinsics, LIST_EXTRINSICS } from '../../schemas/extrinsics.schema';

const ROWS_PER_PAGE = 25;

const extrinsicToRow = (extrinsic: ListExtrinsics['extrinsics'][0]): BaselineCell[] => {
  return BaseLineCellsWrapper([
    <Link
      to={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.index}`}
    >{`${extrinsic.blockNumber}-${extrinsic.index}`}</Link>,
    <Link to={`/blocks/${extrinsic.blockNumber}`}>{extrinsic.blockNumber}</Link>,
    <Hash value={extrinsic.hash} link={`/extrinsics/${extrinsic.hash}`} truncated />,
    <TimeAgoComponent date={extrinsic.timestamp} />,
    <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />,
    <Link to='#'>{`${extrinsic.section} (${extrinsic.method})`}</Link>
  ]);
};

const headers = BaseLineCellsWrapper([
  'extrinsics id',
  'block',
  'extrinsics hash',
  'time',
  'result',
  'action'
]);

const HistoryTable = () => {
  const [timestamp, setTimestamp] = useState<number>();
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback((event) => {
    setTimestamp(undefined);
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  }, []);

  const { data, loading } = useQuery<ListExtrinsics>(LIST_EXTRINSICS, {
    variables: {
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      orderBy: [{ timestamp: 'desc' }],
      where: { timestamp: { _lte: timestamp } }
    }
  });
  const onPageChange = useCallback(
    (_: unknown, number: number) => {
      const extrinsic = data?.extrinsics.at(0);
      if (!timestamp && extrinsic?.timestamp !== undefined) {
        setTimestamp(extrinsic.timestamp);
      }
      setPage(number);
    },
    [timestamp, data?.extrinsics]
  );
  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  if (loading) return <TableSkeleton rows={12} cells={6} footer />;

  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          page={page}
          count={data?.agg.aggregate.count || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
    />
  );
};

export default HistoryTable;
