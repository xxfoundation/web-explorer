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

const header = ['era', 'start block', 'end block', 'reward point', 'blocks produced'];

const rowParser = (rowData: {
    era: string,
    startBlock: number,
    endBlock: number,
    rewardPoint: number,
    blocksProduced: number
  }) => {
  return (
    <TableRow key={rowData.era}>
      <TableCell>{rowData.era}</TableCell>
      <TableCell><Link to={`/block/${rowData.startBlock}`}>{rowData.startBlock}</Link></TableCell>
      <TableCell><Link to={`/block/${rowData.endBlock}`}>{rowData.endBlock}</Link></TableCell>
      <TableCell>{rowData.rewardPoint}</TableCell>
      <TableCell><Link to={`/producer/${rowData.blocksProduced}`}>{rowData.blocksProduced}</Link></TableCell>
    </TableRow>
  );
};

const data = [
  {
    era: '12313',
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

export default ErasTables;
