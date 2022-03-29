import { styled } from '@mui/material/styles';

import { Link, Button } from '@mui/material';

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
  color: theme.palette.text.primary,
  '&:hover': {
    background: 'none',
    '&:before': {
      content: "''",
      display: 'block',
      height: 1,
      width: 20,
      background: theme.palette.text.primary,
      position: 'absolute',
      top: 0,
      left: 6
    }
  }
}));
