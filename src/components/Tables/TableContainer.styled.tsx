import { TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TableStyled = styled(TableContainer)(({ theme }) => ({
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
    borderBottom: 'none',
    fontSize: theme.typography.body2.fontSize,
    color: theme.typography.body2.color,
    fontWeight: 400,
    'p':{ // if a <p> in the table cell fix styles
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 400 
    }
  }
}));