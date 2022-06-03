import { styled } from '@mui/material';

export const DarkTooltip = styled('div')(({ theme }) => ({
  pointerEvents: 'none',
  backgroundColor: theme.palette.grey[600],
  padding: '0.75rem',
  fontWeight: 400,
  letterSpacing: '8%',
  fontSize: '10',
  color: theme.palette.getContrastText(theme.palette.grey[600]),
  borderRadius: '1rem',
  boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.08)'
}));

export const LightTooltip = styled('div')(({ theme }) => ({
  pointerEvents: 'none',
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0px 0px 23px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(16px)',
  padding: '2rem',
  borderRadius: '1rem',
  zIndex: 1,
  '& h1, h2, h3, h4, h5, h6': {
    textTransform: 'uppercase',
    color: theme.palette.grey[600]
  },
  color: theme.palette.grey[500],
  [theme.breakpoints.down('sm')]: {
    fontSize: 12
  }
}));

export const LightTooltipHeader = styled('h6')(({ theme }) => ({
  color: theme.palette.grey[800],
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  margin: 0,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    fontSize: 12
  }
}));