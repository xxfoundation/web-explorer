import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import TablePagination from '../../components/TablePagination';

type Extrinsic = {
  id: string;
  block: number;
  hash: string;
  time: string;
  action: string;
};

const extrinsicToRow = (extrinsic: Extrinsic) => {
  return (
    <TableRow key={extrinsic.id}>
      <TableCell>
        <Link to={`/extrinsics/${extrinsic.id}`}>{extrinsic.id}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/blocks/${extrinsic.block}`}>item.block</Link>
      </TableCell>
      <TableCell>
        <Link to={`/extrinsics/${extrinsic.hash}`}>
          <Hash value={extrinsic.hash} variant='body3' truncated />
        </Link>
      </TableCell>
      <TableCell>{extrinsic.time}</TableCell>
      <TableCell>
        <AccessTimeIcon color='warning' />
      </TableCell>
      <TableCell>
        <Link to='#'>{extrinsic.action}</Link>
      </TableCell>
      <TableCell>
        <ArrowForwardIosIcon />
      </TableCell>
    </TableRow>
  );
};

const HistoryTable = () => {
  const extrinsicsHistoryData = useMemo(() => {
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
  }, []);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  return (
    <TableContainer component={Paper}>
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
        rowsPerPageOptions={[20,30,40,50]}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 20))
          setPage(0)
        }}
      />
    </TableContainer>
  );
};

const HistoryPage = () => {
  return (
    <Container sx={{ mt: 5, mb: 12 }}>
      {/* chart */}
      <HistoryTable />
    </Container>
  );
};

export default HistoryPage;
