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
import Link from '../Link';

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
      <TableCell>{rowData.hash}</TableCell>
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
      hash: '0xb5913131231231231',
      eventId: 12313
    }
  ];
  return (
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
  );
};

export default BlockExtrinsics;
