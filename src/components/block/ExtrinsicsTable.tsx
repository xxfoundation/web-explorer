import { useQuery } from '@apollo/client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Tooltip, Typography } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { EXTRINSICS_OF_BLOCK } from '../../schemas/extrinsics.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';
import { TableCellLeftDivider } from '../Tables/TableCell';
import TablePagination from '../Tables/TablePagination';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TimeAgoComponent from '../TimeAgo';

type ExtrinsicsTyp = {
  id: number;
  hash: string;
  timestamp: number;
  success: boolean;
  method: string;
  section: string;
};

type Response = { extrinsic: ExtrinsicsTyp[] };

const rowsParser = (rowData: ExtrinsicsTyp) => {
  return BaseLineCellsWrapper([
    <Link to={`/extrinsics/${rowData.id}`}>{rowData.id}</Link>,
    <Tooltip
      title={
        <Typography fontSize={'10px'} fontWeight={400}>
          {rowData.hash}
        </Typography>
      }
      placement={'top'}
      arrow
    >
      <span>
        <Hash value={rowData.hash} truncated />
      </span>
    </Tooltip>,
    <TimeAgoComponent date={rowData.timestamp} />,
    <CheckCircleOutlineIcon color='success' />,
    <Link to='#'>{`${rowData.section} (${rowData.method})`}</Link>,
    <TableCellLeftDivider>
      <Link to={`/events/${rowData.id}`}>
        <ArrowForwardIosIcon />
      </Link>
    </TableCellLeftDivider>
  ]);
};

const headers = BaseLineCellsWrapper([
  'extrinsic id',
  'hash',
  'time',
  'result',
  'action',
  <TableCellLeftDivider>
    <Link to='/extrinsics'>view all</Link>
  </TableCellLeftDivider>
]);

const BlockExtrinsics: FC<{ where: unknown }> = ({ where }) => {
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
          extrinsic_index: 'desc'
        }
      ],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where
    };
  }, [page, rowsPerPage, where]);
  const { data, loading } = useQuery<Response>(EXTRINSICS_OF_BLOCK, {
    variables
  });
  const rows = useMemo(() => (data?.extrinsic || []).map(rowsParser), [data]);
  if (loading) return <TableSkeleton rows={6} cells={6} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          count={data?.extrinsic.length || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[2, 4, 6]}
        />
      }
    />
  );
};

export default BlockExtrinsics;
