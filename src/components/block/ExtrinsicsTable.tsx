import { useQuery } from '@apollo/client';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import { EXTRINSICS_OF_BLOCK, ListExtrinsics, Extrinsic } from '../../schemas/extrinsics.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';
import Error from '../../components/Error';

const ROWS_PER_PAGE = 5;

const rowsParser = (rowData: Extrinsic) => {
  return BaseLineCellsWrapper([
    <Link to={`/extrinsics/${rowData.blockNumber}-${rowData.index}`}>
      {rowData.blockNumber}-{rowData.index}
    </Link>,
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

const paginate = (events: Extrinsic[], rowsPerPage: number, page: number): Extrinsic[] => {
  // page starts at 0
  return events.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
};

const headers = BaseLineCellsWrapper(['extrinsic id', 'hash', 'time', 'result', 'action']);

const BlockExtrinsics: FC<{
  where: Record<string, unknown>;
  setCount?: (count: number) => void;
}> = ({ where, setCount: setCount = () => {} }) => {
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);

  // Query data from DB
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'desc' }],
      where: { ...where }
    };
  }, [where]);
  const { data, error, loading } = useQuery<ListExtrinsics>(EXTRINSICS_OF_BLOCK, { variables });

  // Display Data in Paginated Table
  const rows = useMemo(() => {
    return paginate(data?.extrinsics || [], rowsPerPage, page).map(rowsParser);
  }, [data?.extrinsics, page, rowsPerPage]);

  // Update count
  useEffect(() => {
    if (setCount !== undefined && data?.agg) {
      setCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount]);

  // Return rendering components
  const footer = useMemo(() => {
    if (data?.agg && data?.extrinsics && data.extrinsics.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 50]}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.extrinsics, onPageChange, onRowsPerPageChange, page, rowsPerPage]);
  if (error) return <Error type='data-unavailable' />;
  if (loading) return <TableSkeleton rows={rowsPerPage} cells={headers.length} footer />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default BlockExtrinsics;
