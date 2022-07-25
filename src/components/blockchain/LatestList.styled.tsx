import { styled, TableCell, Typography } from '@mui/material';

export const BorderlessCell = styled(TableCell)({
  borderBottom: 'none',
});

export const Header = styled(Typography)(({ theme }) => ({
  verticalAlign: 'middle',
  ...theme.typography.body2,
  fontWeight: 500,
  textTransform: 'uppercase',
  color: theme.palette.grey[600]
}));

