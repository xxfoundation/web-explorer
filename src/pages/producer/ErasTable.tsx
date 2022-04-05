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
import { Link } from 'react-router-dom';

type Era = {
  index: string,
  startBlock: number,
  endBlock: number,
  rewardPoint: number,
  blocksProduced: number
}

const EraRow = (rowData: Era) => {
  return (
    <TableRow key={rowData.index}>
      <TableCell>{rowData.index}</TableCell>
      <TableCell><Link to={`/block/${rowData.startBlock}`}>{rowData.startBlock}</Link></TableCell>
      <TableCell><Link to={`/block/${rowData.endBlock}`}>{rowData.endBlock}</Link></TableCell>
      <TableCell>{rowData.rewardPoint}</TableCell>
      <TableCell><Link to={`/producer/${rowData.blocksProduced}`}>{rowData.blocksProduced}</Link></TableCell>
    </TableRow>
  );
};

const eras = [
  {
    index: '12313',
    startBlock: 1245151,
    endBlock: 15666655,
    rewardPoint: 12313.31231,
    blocksProduced: 113
  }
];

const ErasTables = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              era
            </TableCell>
            <TableCell>
              start block
            </TableCell>
            <TableCell>
              end block
            </TableCell>
            <TableCell>
              reward point
            </TableCell>
            <TableCell>
              blocks produced
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eras.map(EraRow)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ErasTables;
