import { styled, Typography } from '@mui/material';

export const LegendTypographyHeader = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.grey[400],
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    fontSize: 12
  }
}));

export const LegendTypographySubHeaders = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 18,
  color: theme.palette.grey[800],
  textTransform: 'uppercase',
  letterSpacing: '7%',
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  }
}));
