import { TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { default as React, FC } from 'react';

const TableStyled = styled(TableContainer)(({ theme }) => ({
  padding: 0, 
  [theme.breakpoints.down('sm')]: {
    padding: 0, 
  },
  '.MuiTableHead-root': {
    textTransform: 'uppercase'
  },
  '.MuiTableCell-head': {
    paddingTop: 0
  },
  '.MuiTableCell-body': {
    borderBottom: 'none'
  }
}));

export const TableWrap: FC = ({ children }) => (
  <TableStyled>
      {children}
  </TableStyled>
);
