import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PaperStyled = styled(Paper)(({ theme }) => ({
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: (theme.shape.borderRadius as number) * 3,
  overflow: 'hidden',
  padding: 0, 
  [theme.breakpoints.down('sm')]: {
      padding: 0, 
  },
}));

export const RowStyled = styled(Grid)(({  }) => ({
  '&:first-child > div': {
      paddingTop: 50
  },
  '&:last-child > div': {
      paddingBottom: 50
  },
}));

export const LabelStyled = styled(Grid)(({ theme }) => ({
  background: theme.palette.grey[100],
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
  borderRightColor: theme.palette.grey[200],
  paddingLeft: 70, 
  paddingRight: 40, 
  paddingTop: 16, 
  paddingBottom: 16,
  textTransform: 'uppercase',
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.grey[700],
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
      padding: 0, 
  }
}));

export const ValueStyled = styled(Grid)(({ theme }) => ({
  paddingLeft: 50, 
  paddingRight: 40, 
  paddingTop: 16, 
  paddingBottom: 16,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.grey[500],
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
      padding: 0, 
  },
  '&:first-of-type': {
      paddingTop: 40
  },
  '&::last-child': {
      paddingBottom: 40
  }
}));