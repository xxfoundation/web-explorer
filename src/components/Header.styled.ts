import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const Root = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  background: theme.gradients?.primary,
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  }
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(5),
  justifyContent: 'none',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'space-between'
  }
}));