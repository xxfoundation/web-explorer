import { useQuery } from '@apollo/client';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { FC, useMemo } from 'react';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { EXTRINSICS_OF_BLOCK } from '../../schemas/extrinsics.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';

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

type Response = { extrinsic: ExtrinsicsTyp[]; agg: { aggregate: { count: number } } };

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
  const { cursorField, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    usePaginatorByCursor({
      rowsPerPage: 4,
      cursorField: 'id'
    });
  const variables = useMemo(() => {
    return {
      orderBy: [{ id: 'desc' }],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where: { ...where, id: cursorField },
      aggWhere: { ...where }
    };
  }, [cursorField, page, rowsPerPage, where]);
  const { data, loading } = useQuery<Response>(EXTRINSICS_OF_BLOCK, { variables });
  const rows = useMemo(() => (data?.extrinsic || []).map(rowsParser), [data?.extrinsic]);
  if (loading) return <TableSkeleton rows={6} cells={6} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          count={data?.agg.aggregate.count || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data?.extrinsic.at(0))}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[2, 4, 6]}
        />
      }
    />
  );
};

export default BlockExtrinsics;
