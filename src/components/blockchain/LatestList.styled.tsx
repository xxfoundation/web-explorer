import { styled, TableCell, Typography } from '@mui/material';

export const BorderlessCell = styled(TableCell)({
  borderBottom: 'none',
});

export const Header = styled(Typography)<{ component?: string }>(({ theme }) => ({
  ...theme.typography.body2,
  verticalAlign: 'middle',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: theme.palette.grey[600]
}));

