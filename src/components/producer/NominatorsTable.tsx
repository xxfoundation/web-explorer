import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const header = ['account', 'stake', 'share'];

const rowParser = (rowData: {
  account: string;
  stake: string;
  share: string;
}) => {
  return (
    <TableRow key={rowData.account}>
      <TableCell>
        <Link to={`/account/${rowData.account}`}>{rowData.account}</Link>
      </TableCell>
      <TableCell>{rowData.stake}</TableCell>
      <TableCell>{rowData.share}</TableCell>
    </TableRow>
  );
};

const data = [
  {
    account: '6aTgpWh4Ny1j8uvXbvBb5pY1cokWMthuAUvcMKi9V1WkCsUo',
    stake: '200.00 XX',
    share: '0.00%'
  }
];

const NominatorsTable = () => {
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

export default NominatorsTable;
