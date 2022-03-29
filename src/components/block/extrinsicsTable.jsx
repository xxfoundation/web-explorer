import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../themes/default';

const header = ['extrinsic id', 'hash', 'time', 'result', 'action', 'view all'];

const rowParser = (rowData) => {
  return (
    <TableRow key={rowData.extrinsicId}>
      <TableCell>
        <Link to="#">{rowData.extrinsicId}</Link>
      </TableCell>
      <TableCell>{rowData.hash}</TableCell>
      <TableCell>{rowData.time}</TableCell>
      <TableCell>
        <CheckCircleOutlineIcon color={theme.palette.success.main} />
      </TableCell>
      <TableCell>
        <Link to="#">{rowData.action}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/extrinsics/${rowData.eventId}`}>
          <ArrowForwardIosIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const BlockExtrinsics = ({ }) => {
  // TODO subscribe to events and fill data
  const data = [
    {
      extrinsicId: '312313-3',
      action: 'parachainsystem (set_validation_data)',
      time: '15h 49min',
      hash: '0xb5913131231231231'
    }
  ];
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

export default BlockExtrinsics;
