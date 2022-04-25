import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Hash } from '../ChainId';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';
import { TableCellLeftDivider } from '../Tables/TableCell';
import TablePagination from '../Tables/TablePagination';
import TimeAgoComponent from '../TimeAgo';
import Skeleton from './ExtrinsicsTable.skeleton';

type ExtrinsicsTyp = {
  extrinsicId: string;
  hash: string;
  time: string;
  action: string;
  eventId: number;
};

const rowParser = (rowData: ExtrinsicsTyp) => {
  return BaseLineCellsWrapper([
    <Link to={`/extrinsics/${rowData.extrinsicId}`}>{rowData.extrinsicId}</Link>,
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
    <TimeAgoComponent date={rowData.time} />,
    <CheckCircleOutlineIcon color='success' />,
    <Link to='#'>{rowData.action}</Link>,
    <TableCellLeftDivider>
      <Link to={`/events/${rowData.eventId}`}>
        <ArrowForwardIosIcon />
      </Link>
    </TableCellLeftDivider>
  ]);
};

const data = [
  {
    extrinsicId: '312313-3',
    action: 'parachainsystem (set_validation_data)',
    time: '2022-02-16 01:56:42 (+UTC)',
    hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
    eventId: 12313
  }
];

const BlockExtrinsics: FC<{ loading?: boolean }> = ({ loading }) => {
  if (loading) return <Skeleton />;
  return (
    <>
      <BaselineTable
        headers={BaseLineCellsWrapper([
          'extrinsic id',
          'hash',
          'time',
          'result',
          'action',
          <TableCellLeftDivider>
            <Link to='/extrinsics'>view all</Link>
          </TableCellLeftDivider>
        ])}
        rows={data.map(rowParser)}
      />
      <TablePagination count={data.length} page={0} />
    </>
  );
};

export default BlockExtrinsics;
