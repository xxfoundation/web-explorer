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
import Link from '../Link';
import TablePagination from '../TablePagination';

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
      <TablePagination
        count={data.length}
        rowsPerPage={20}
        rowsPerPageOptions={[20, 30, 40]}
        onPageChange={() => {}}
      />
    </>
  );
};

export default BlockEvents;
