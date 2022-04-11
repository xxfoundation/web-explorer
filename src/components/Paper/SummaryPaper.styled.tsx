import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PaperStyled = styled(Paper)(({ theme }) => ({
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: (theme.shape.borderRadius as number) * 3,
  overflow: 'hidden',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    padding: 0
  }
}));

export const RowStyled = styled(Grid)(({}) => ({
  minHeight: 60,
  '&:first-child > div': {
    paddingTop: 50,
    minHeight: 95
  },
  '&:last-child > div': {
    paddingBottom: 50,
    minHeight: 115
  }
}));

export const LabelStyled = styled(Grid)(({ theme }) => ({
  background: theme.palette.grey[100],
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
  borderRightColor: theme.palette.grey[200],
  paddingLeft: 70,
  paddingRight: 40,
  paddingTop: 0,
  paddingBottom: 0,
  textTransform: 'uppercase',
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.grey[700],
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    padding: 0
  }
}));

export const ValueStyled = styled(Grid)(({ theme }) => ({
  paddingLeft: 50,
  paddingRight: 50,
  paddingTop: 0,
  paddingBottom: 0,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.grey[500],
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  '&:first-of-type': {
    paddingTop: 40
  },
  '&::last-child': {
    paddingBottom: 40
  },
  'p': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '14px',
    fontWeight: '400'
  }
}));

export const ActionStyled = styled(Grid)(() => ({
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0
}));
