import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { TableContainer } from '../../components/Tables/TableContainer';
import TablePagination from '../../components/Tables/TablePagination';

type Extrinsic = {
  id: string;
  block: number;
  hash: string;
  time: string;
  action: string;
};

const extrinsicToRow = (extrinsic: Extrinsic) => {
  const extrinsicIdLink = `/extrinsics/${extrinsic.id}`;
  return (
    <TableRow key={extrinsic.id}>
      <TableCell>
        <Link to={extrinsicIdLink}>{extrinsic.id}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/blocks/${extrinsic.block}`}>{extrinsic.block}</Link>
      </TableCell>
      <TableCell>
        <Hash value={extrinsic.hash} link={`/extrinsics/${extrinsic.hash}`} truncated />
      </TableCell>
      <TableCell>{extrinsic.time}</TableCell>
      <TableCell>
        <AccessTimeIcon color='warning' />
      </TableCell>
      <TableCell>
        <Link to='#'>{extrinsic.action}</Link>
      </TableCell>
      <TableCell>
        <Link to={extrinsicIdLink}>
          <ArrowForwardIosIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const sampleData = () => {
  const items = [];
  for (let step = 0; step < 21; step++) {
    items.push({
      id: '357706-' + step,
      block: 357968,
      hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
      time: '32 min',
      action: 'balances (transfer)'
    });
  }
  return items;
};

const HistoryTable = () => {
  const extrinsicsHistoryData = sampleData();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>extrinsics id</TableCell>
            <TableCell>block</TableCell>
            <TableCell>extrinsics hash</TableCell>
            <TableCell>time</TableCell>
            <TableCell>result</TableCell>
            <TableCell>action</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? extrinsicsHistoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : extrinsicsHistoryData
          ).map(extrinsicToRow)}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        count={extrinsicsHistoryData.length}
        rowsPerPage={rowsPerPage}
        onPageChange={(_: unknown, number: number) => {
          setPage(number);
        }}
        rowsPerPageOptions={[20, 30, 40, 50]}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value));
          setPage(0);
        }}
      />
    </TableContainer>
  );
};

export default HistoryTable;
