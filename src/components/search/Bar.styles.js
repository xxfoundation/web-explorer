import { Button, Input, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

export const Bar = styled('div')(({ theme }) => { 
  const { pathname } = useLocation(); 
  return({
    background: 'rgba(255,255,255,0.24)',
    borderRadius: 48,
    border: pathname == '/' ? theme.borders.light : 'none',
    boxShadow: '0px 15px 34px 3px rgba(0, 0, 0, 0.04)',
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText
  });
});

export const SelectOption = styled(Select)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  paddingLeft: theme.spacing(3),
  background: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  '&:before, &:after': {
    border: 'none !important'
  },
  svg: {
    color: theme.palette.primary.contrastText
  }
}));

export const SelectItem = styled(MenuItem)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: 14,
  padding: 7.5,
  paddingLeft: 20,
  paddingRight: 20,
  color: theme.palette.grey.A700,
  '&:hover': {
    color: '#00A2D6',
  }
}));

export const SearchInput = styled(Input)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:before, &:after': {
    border: 'none !important'
  },
  svg: {
    color: theme.palette.primary.contrastText
  }
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  background: 'none',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  color: theme.palette.primary.contrastText
}));
