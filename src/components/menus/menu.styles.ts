import { Button, Link, Typography } from '@mui/material';
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
  color: theme.palette.text.primary,
  '&:hover': {
    background: 'none',
    '&:before': {
      content: '\'\'',
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

// export const MobileListLink = styled(Link)(({ theme }) => ({
//   display: 'block',
//   paddingTop: theme.spacing(1),
//   paddingBottom: theme.spacing(1),
//   color: '#D2D2D2', // theme.palette.grey.neutral TODO access the proper color palette value
//   fontSize: 16,
//   '&:hover': {
//     color: '#00C4FF'
//   }
// }));

// export const MobileTitle = styled(Typography)(({ theme }) => ({
//   display: 'block',
//   paddingTop: theme.spacing(1),
//   paddingBottom: theme.spacing(1),
//   color: '#FFFFFF', // theme.palette.grey.A000 TODO access the proper color palette value
//   fontSize: 24,
//   fontWeight: 'bold'
// }));

// export const MobileTitleLink = styled(Link)(({ theme }) => ({
//   display: 'block',
//   paddingTop: theme.spacing(1),
//   paddingBottom: theme.spacing(1),
//   color: '#FFFFFF', // theme.palette.grey.A000 TODO access the proper color palette value
//   fontSize: 24,
//   fontWeight: 'bold',
//   '&:hover': {
//     color: '#00C4FF'
//   }
// }));
