import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from '../Link';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(5.5),
  paddingRight: theme.spacing(5.5),
  color: theme.palette.primary.contrastText,
  boxShadow: theme.boxShadow,
  borderRadius: 13,
  mask: 'linear-gradient(#FFF,#FFF)',
  '&:before': {
    content: '\'\'',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.gradients?.primary,
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
  fontSize: 18,
  fontWeight: 500,
  [theme.breakpoints.down('md')]: {
    fontSize: 20
  }
}));

export const Wrap = styled(Grid)(() => ({
  position: 'relative'
}));

export const ChainInfoLink = styled(Link)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: 0,
  top: 0,
  '&:hover': {
    background: 'rgba(0,0,0,0.25)',
  }
});