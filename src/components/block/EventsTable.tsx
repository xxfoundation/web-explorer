import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Hash } from '../ChainId';
import Link from '../Link';
import TablePagination from '../TablePagination';
import { TableContainer } from '../Tables/TableContainer';

type EventType = {
  id: string;
  hash: string;
  action: string;
  extrinsicId?: string;
};

const rowParser = (rowData: EventType) => {
  return (
    <TableRow key={rowData.id}>
      <TableCell>{rowData.id}</TableCell>
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
        <Link to='#'>{rowData.action}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/events/${rowData.id}`}>
          <ArrowForwardIosIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const staticDataPagination = (page: number, rowsPerPage: number, data: EventType[]) => {
  return rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data;
};

const EventsTable: FC<{ data: EventType[] }> = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>event id</TableCell>
              <TableCell>hash</TableCell>
              <TableCell>action</TableCell>
              <TableCell>
                <Link to='/extrinsics'>view all</Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{staticDataPagination(page, rowsPerPage, data).map(rowParser)}</TableBody>
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
