import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { Hash } from '../ChainId';
import Link from '../Link';
import { TableCellLeftDivider } from '../Tables/TableCell';
import { TableContainer } from '../Tables/TableContainer';
import TablePagination from '../Tables/TablePagination';
import TimeAgoComponent from '../TimeAgo';

type ExtrinsicsTyp = {
  extrinsicId: string;
  hash: string;
  time: string;
  action: string;
  eventId: number;
};

const rowParser = (rowData: ExtrinsicsTyp) => {
  return (
    <TableRow key={rowData.extrinsicId}>
      <TableCell>
        <Link to={`/extrinsics/${rowData.extrinsicId}`}>{rowData.extrinsicId}</Link>
      </TableCell>
      <TableCell>
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
        </Tooltip>
      </TableCell>
      <TableCell>
        <TimeAgoComponent date={rowData.time} />
      </TableCell>
      <TableCell>
        <CheckCircleOutlineIcon color='success' />
      </TableCell>
      <TableCell>
        <Link to='#'>{rowData.action}</Link>
      </TableCell>
      <TableCell>
        <TableCellLeftDivider>
          <Link to={`/events/${rowData.eventId}`}>
            <ArrowForwardIosIcon />
          </Link>
        </TableCellLeftDivider>
      </TableCell>
    </TableRow>
  );
};

const BlockExtrinsics = () => {
  // TODO subscribe to events and fill data with hash or number
  const data = [
    {
      extrinsicId: '312313-3',
      action: 'parachainsystem (set_validation_data)',
      time: '2022-02-16 01:56:42 (+UTC)',
      hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
      eventId: 12313
    }
  ];
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>extrinsic id</TableCell>
              <TableCell>hash</TableCell>
              <TableCell>time</TableCell>
              <TableCell>result</TableCell>
              <TableCell>action</TableCell>
              <TableCell>
                <TableCellLeftDivider>
                  <Link to='/extrinsics'>view all</Link>
                </TableCellLeftDivider>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data.map(rowParser)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination count={data.length} page={0} />
    </>
  );
};

export default BlockExtrinsics;
