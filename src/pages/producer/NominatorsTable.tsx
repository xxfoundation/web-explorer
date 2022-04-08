import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import Link from '../../components/Link';

type Stake = {
  account: string;
  stake: string;
  share: string;
};

const EraStake = ({ account, share, stake }: Stake) => {
  return (
    <TableRow key={account}>
      <TableCell>
        <Link to={`/account/${account}`}>{account}</Link>
      </TableCell>
      <TableCell>{stake}</TableCell>
      <TableCell>{share}</TableCell>
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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Stake</TableCell>
            <TableCell>Share</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data.map(EraStake)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default NominatorsTable;
