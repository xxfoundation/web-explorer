import { Table as MuiTable, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

const paddinglessCells = {
  '& td:first-child, & th:first-child': {
    paddingLeft: 0
  },
  '& td:last-child, & th:first-child': {
    paddingRight: 0
  },
};

export const Table = styled(MuiTable)(paddinglessCells);

export const TableStyled = styled(TableContainer)(({ theme }) => ({
  ...paddinglessCells,
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  '.MuiTableHead-root': {
    textTransform: 'uppercase'
  },
  '.MuiTableCell-head': {
    paddingTop: 0
  },
  '.MuiTableCell-body': {
    borderBottom: 'none',
    fontSize: theme.typography.body2.fontSize,
    color: theme.typography.body2.color,
    fontWeight: 400,
    p: {
      // if a <p> in the table cell fix styles
      fontSize: theme.typography.body2.fontSize,
      fontWeight: 400
    }
  }
}));
