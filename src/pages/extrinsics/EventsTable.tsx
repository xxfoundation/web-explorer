import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import TablePagination from '../../components/TablePagination';
import { TableContainer } from '../../components/Tables/TableContainer';

type EventType = {
  id: string;
  hash: string;
  action: string;
};

const parseEventRow = (item: EventType) => {
  return (
    <TableRow>
      <TableCell colSpan={3}>{item.id}</TableCell>
      <TableCell colSpan={3}>
        <Hash value={item.hash} variant='body3' truncated />
      </TableCell>
      <TableCell colSpan={6}>{item.action}</TableCell>
      <TableCell>
        <Link to={`/events/${item.id}`}>
          <ChevronRightIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const sampleData = () => {
  const items = [];
  for (let step = 0; step < 9; step++) {
    items.push({
      id: '287845-' + step,
      hash: '0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a869',
      action: 'Balances (Withdraw)'
    });
  }
  return items;
};

const staticDataPagination = (page: number, rowsPerPage: number, data: EventType[]) => {
  return rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data;
};

const EventsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const data = sampleData();
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>event id</TableCell>
              <TableCell colSpan={3}>hash</TableCell>
              <TableCell colSpan={6}>action</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{staticDataPagination(page, rowsPerPage, data).map(parseEventRow)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        count={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={(_: unknown, number: number) => {
          setPage(number);
        }}
        rowsPerPageOptions={[2, 4, 6]}
        onRowsPerPageChange={({ target: { value } }) => {
          setRowsPerPage(parseInt(value));
          setPage(0);
        }}
      />
    </>
  );
};

export default EventsTable;
