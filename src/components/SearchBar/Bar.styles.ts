import { Box, Button, Input, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

export const Bar = styled(Box)(({ theme }) => {
  const { pathname } = useLocation();
  return {
    background: 'rgba(255,255,255,0.24)',
    borderRadius: 48,
    border: pathname == '/' ? theme.borders?.light : 'none',
    boxShadow: '0px 15px 34px 3px rgba(0, 0, 0, 0.04)',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.25)
    }
  };
});

export const SelectItem = styled(MenuItem)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: 14,
  padding: 7.5,
  paddingLeft: 20,
  paddingRight: 20,
  color: theme.palette.grey.A700,
  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    color: theme.palette.text.secondary,
    background: 'none'
  }
}));

export const SearchInput = styled(Input)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
  },
  color: theme.palette.text.primary,
  '&:before, &:after': {
    border: 'none !important'
  },
  svg: {
    color: theme.palette.primary.main
  }
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  background: 'none',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  color: theme.palette.mode === 'light'
    ? theme.palette.grey[700]
    : theme.palette.grey[100],
}));
