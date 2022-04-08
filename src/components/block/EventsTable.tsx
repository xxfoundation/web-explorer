import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import Link from '../Link';
import TablePagination from '../TablePagination';
import { TableContainer } from '../Tables/TableContainer';

const header = ['event id', 'hash', 'action', 'view all'];

type EventTyp = {
  eventId: string;
  action: string;
};

const rowParser = (rowData: EventTyp) => {
  return (
    <TableRow key={rowData.eventId}>
      <TableCell>{rowData.eventId}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <Link to='#'>{rowData.action}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/extrinsics/${rowData.eventId}`}>
          <ArrowForwardIosIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const data = [
  {
    eventId: '312313',
    action: 'balance (Withraw)'
  }
];

const BlockEvents = () => {
  // TODO subscribe to events and fill data with hash or number
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
      <TablePagination page={0} count={data.length} />
    </>
  );
};

export default BlockEvents;
