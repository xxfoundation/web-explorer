import { useQuery } from '@apollo/client';
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
import { LIST_EVENTS } from '../../schemas/events.schema';
import { Hash } from '../ChainId';
import Link from '../Link';
import { TableCellLeftDivider } from '../Tables/TableCell';
import { TableContainer } from '../Tables/TableContainer';
import TablePagination from '../Tables/TablePagination';

type EventType = {
  id: string;
  hash?: string;
  action?: string;
  extrinsicId?: string;
};

const rowParser = (rowData: EventType) => {
  return (
    <TableRow key={rowData.id}>
      <TableCell align='left'>{rowData.id}</TableCell>
      <TableCell align='left'>
        <Tooltip
          title={
            <Typography fontSize={'10px'} fontWeight={400}>
              {rowData.hash}
            </Typography>
          }
          placement={'top'}
          arrow
        >
          <span>{rowData.hash && <Hash value={rowData.hash} truncated />}</span>
        </Tooltip>
      </TableCell>
      <TableCell align='left'>
        <Link to='#'>{rowData.action}</Link>
      </TableCell>
      <TableCell align='center'>
        <TableCellLeftDivider>
          <Link to={`/events/${rowData.id}`}>
            <ArrowForwardIosIcon />
          </Link>
        </TableCellLeftDivider>
      </TableCell>
    </TableRow>
  );
};

const EventsTable: FC<{ blockNumber?: number }> = ({ blockNumber }) => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const { data, loading } = useQuery<{ events: EventType[] }>(LIST_EVENTS, {
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
  // const data = [
  //   {
  //     extrinsicId: '312313',
  //     action: 'balance (Withraw)',
  //     hash: '0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a869',
  //     id: '312313'
  //   }
  // ];
  return (
    <>
      <TableContainer>
        <Table sx={{ 'th:last-child, td:last-child': { maxWidth: '13px' } }}>
          <TableHead>
            <TableRow>
              <TableCell align='left'>event id</TableCell>
              <TableCell align='left'>hash</TableCell>
              <TableCell>action</TableCell>
              <TableCell align='center'>
                <TableCellLeftDivider>
                  <Link to='/extrinsics'>view all</Link>
                </TableCellLeftDivider>
              </TableCell>
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
