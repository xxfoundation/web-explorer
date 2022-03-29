import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
import { Link } from 'react-router-dom';

const header = ['event id', 'hash', 'action', 'view all'];

const rowParser = (rowData) => {
  return (
    <TableRow key={rowData.eventId}>
      <TableCell>{rowData.eventId}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <Link to="#">{rowData.action}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/extrinsics/${rowData.eventId}`}>
          <ArrowForwardIosIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const BlockEvents = ({}) => {
  // TODO subscribe to events and fill data
  const data = [
    {
      eventId: '312313',
      action: 'balance (Withraw)'
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

export default BlockEvents;
