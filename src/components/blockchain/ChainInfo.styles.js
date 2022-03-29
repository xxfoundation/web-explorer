import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(5.5),
  paddingRight: theme.spacing(5.5),
  color: theme.palette.primary.contrastText,
  boxShadow: theme.boxShadow,
  borderRadius: 13,
  cursor: 'pointer',
  mask: 'linear-gradient(#FFF,#FFF)',
  '&:before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.gradients?.primary,
    zIndex: '-1'
  },
  '&:hover:after': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.25)',
    zIndex: '-1'
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}));

export const Data = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: 16
  }
}));
