import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useMemo } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import usePagination from '../../hooks/usePagination';
import { ListExtrinsics, LIST_EXTRINSICS } from '../../schemas/extrinsics.schema';

const ROWS_PER_PAGE = 25;

const extrinsicToRow = (extrinsic: ListExtrinsics['extrinsics'][0]): BaselineCell[] => {
  return BaseLineCellsWrapper([
    <Link
      to={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.index}`}
    >{`${extrinsic.blockNumber}-${extrinsic.index}`}</Link>,
    <Link to={`/blocks/${extrinsic.blockNumber}`}>{extrinsic.blockNumber}</Link>,
    <Hash value={extrinsic.hash} link={`/extrinsics/${extrinsic.hash}`} truncated showTooltip />,
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

const HistoryTable: FC<{
  setTotalOfExtrinsics: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = (props) => {
  const [timestamp, rowsPerPage, page, onRowsPerPageChange, onPageChange] = usePagination<
    ListExtrinsics['extrinsics'][0]
  >({
    cursorField: 'timestamp',
    rowsPerPage: ROWS_PER_PAGE
  });

  const variables = useMemo(
    () => ({
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      orderBy: [{ timestamp: 'desc' }],
      where: { timestamp: { _lte: timestamp } }
    }),
    [page, rowsPerPage, timestamp]
  );

  const { data, loading } = useQuery<ListExtrinsics>(LIST_EXTRINSICS, { variables });

  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  useEffect(() => {
    if (data?.agg && !timestamp) {
      props.setTotalOfExtrinsics(data.agg.aggregate.count);
    }
  });

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
          onPageChange={onPageChange(data?.extrinsics.at(0))}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
    />
  );
};

export default HistoryTable;
