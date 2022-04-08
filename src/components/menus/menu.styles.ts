import { Button, Link, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ListLink = styled(Link)(({ theme }) => ({
  display: 'block',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  color: theme.palette.primary.contrastText,
  fontSize: 14
}));

export const MenuButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: 14,
  color: theme.palette.primary.dark,
  '&:hover': {
    background: 'none',
    '&:before': {
      content: '\'\'',
      display: 'block',
      height: 1,
      width: 20,
      background: theme.palette.primary.dark,
      position: 'absolute',
      top: 0,
      left: 6
    }
  }
}));

export const MenuLink = styled(MenuItem)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: 14,
  padding: 7.5,
  paddingLeft: 20,
  paddingRight: 20,
  'a': {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    }
  }
}));