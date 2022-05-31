import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useMemo } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
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
  // FIXME timestamp cannot be the cursor
  const {
    cursorField: id,
    limit,
    offset,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage
  } = usePaginatorByCursor<ListExtrinsics['extrinsics'][0]>({
    cursorField: 'id',
    rowsPerPage: ROWS_PER_PAGE
  });

  const { data, loading } = useQuery<ListExtrinsics>(LIST_EXTRINSICS, {
    variables: {
      limit,
      offset,
      orderBy: [{ id: 'desc' }],
      where: { id: { _lte: id } }
    }
  });

  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  useEffect(() => {
    if (data?.agg && !id) {
      props.setTotalOfExtrinsics(data.agg.aggregate.count);
    }
  });

  const footer = useMemo(() => {
    if (data?.agg && data?.extrinsics && data.extrinsics.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.extrinsics[0])}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.extrinsics, onPageChange, onRowsPerPageChange, page, rowsPerPage]);

  if (loading) return (
    <TableSkeleton
      rows={rowsPerPage}
      cells={headers.length}
      footer />
  );

  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default HistoryTable;
