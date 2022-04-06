import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { Hash } from '../ChainId';
import Link from '../Link';
import TablePagination from '../TablePagination';

const header = ['extrinsic id', 'hash', 'time', 'result', 'action', 'view all'];

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
        <Hash value={rowData.hash} variant='body3' truncated />
      </TableCell>
      <TableCell>{rowData.time}</TableCell>
      <TableCell>
        <CheckCircleOutlineIcon color='success' />
      </TableCell>
      <TableCell>
        <Link to='#'>{rowData.action}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/events/${rowData.eventId}`}>
          <ArrowForwardIosIcon />
        </Link>
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
      time: '15h 49min',
      hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
      eventId: 12313
    }
  ];
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {header.map((h) => {
                return <TableCell key={h}>{h}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>{data.map(rowParser)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={data.length}
        rowsPerPage={20}
        rowsPerPageOptions={[20, 30, 40]}
        onPageChange={() => {}}
      />
    </>
  );
};

export default BlockExtrinsics;
