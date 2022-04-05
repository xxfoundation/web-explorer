import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

export const Root = styled('div')(({ theme }) => { 
  const { pathname } = useLocation(); 
  return({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    background: pathname == '/' ? 'transparent' : theme.gradients?.primary,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: pathname == '/' ? theme.spacing(5) : theme.spacing(10),
    }
  });
});

export const GridContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  justifyContent: 'none',
  [theme.breakpoints.up('sm')]: {
    paddingBottom: theme.spacing(5),
    justifyContent: 'space-between'
  }
}));
