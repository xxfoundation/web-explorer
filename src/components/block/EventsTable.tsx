import { useQuery } from '@apollo/client';
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
import { EVENTS_OF_BLOCK } from '../../schemas/events.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { TableContainer } from '../Tables/TableContainer';
import TablePagination from '../Tables/TablePagination';

type EventType = {
  id: string;
  hash?: string;
  section: string;
  method: string;
};

const rowParser = (rowData: EventType) => {
  return (
    <TableRow key={rowData.id}>
      <TableCell align='left'>{rowData.id}</TableCell>
      <TableCell align='left'>
        {rowData.hash ? (
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
        ) : (
          <Typography>-</Typography>
        )}
      </TableCell>
      <TableCell>
        <Link to='#' textTransform={'capitalize'}>{`${rowData.section} (${rowData.method})`}</Link>
      </TableCell>
    </TableRow>
  );
};

const EventsTable: FC<{ blockNumber?: number }> = ({ blockNumber }) => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const { data, loading } = useQuery<{ events: EventType[] }>(EVENTS_OF_BLOCK, {
    variables: {
      orderBy: [
        {
          event_index: 'desc'
        }
      ],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where: {
        block_number: {
          _eq: blockNumber
        }
      }
    }
  });
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>event id</TableCell>
              <TableCell align='left'>hash</TableCell>
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data?.events.map(rowParser)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        loading={loading}
        count={data?.events.length || 0}
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
