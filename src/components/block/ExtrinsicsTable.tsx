import { useQuery } from '@apollo/client';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { FC, useMemo } from 'react';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { EXTRINSICS_OF_BLOCK } from '../../schemas/extrinsics.schema';
import { TotalOfItems } from '../../schemas/types';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';

const DEFAULT_ROWS_PER_PAGE = 5;

type ExtrinsicsTyp = {
  id: number;
  index: number;
  hash: string;
  blockNumber: string;
  timestamp: number;
  success: boolean;
  method: string;
  section: string;
};

type Response = { extrinsic: ExtrinsicsTyp[] } & TotalOfItems;

const rowsParser = (rowData: ExtrinsicsTyp) => {
  return BaseLineCellsWrapper([
    <Link to={`/extrinsics/${rowData.blockNumber}-${rowData.index}`}>{rowData.index}</Link>,
    <Hash
      value={rowData.hash}
      truncated
      link={`/extrinsics/${rowData.blockNumber}-${rowData.index}`}
      showTooltip
    />,
    <TimeAgoComponent date={rowData.timestamp} />,
    <CheckCircleOutlineIcon color='success' />,
    <Link to='#'>{`${rowData.section} (${rowData.method})`}</Link>
  ]);
};

const headers = BaseLineCellsWrapper(['extrinsic id', 'hash', 'time', 'result', 'action']);

const BlockExtrinsics: FC<{ where: Record<string, unknown> }> = ({ where }) => {
  const { cursorField, limit, offset, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor({
      rowsPerPage: 5,
      cursorField: 'id'
    });
  const variables = useMemo(() => {
    return {
      orderBy: [{ id: 'desc' }],
      limit,
      offset,
      where: { ...where, id: cursorField }
    };
  }, [cursorField, limit, offset, where]);
  const { data, loading } = useQuery<Response>(EXTRINSICS_OF_BLOCK, { variables });
  const rows = useMemo(() => (data?.extrinsic || []).map(rowsParser), [data?.extrinsic]);
  const footer = useMemo(() => {
    if (data?.agg && data?.extrinsic && data.extrinsic.length) {
      return (
        <TablePagination
          count={data.agg.aggregate.count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.extrinsic[0])}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, 20, 50]}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.extrinsic, onPageChange, onRowsPerPageChange, page, rowsPerPage]);
  if (loading) return <TableSkeleton rows={rowsPerPage} cells={headers.length} footer />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default BlockExtrinsics;
