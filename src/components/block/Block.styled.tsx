import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BlockNav = styled(Stack)(({ theme }) => ({
  padding: 0, 
  'a': {
    color: theme.palette.grey[500],
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  'hr': {
    marginTop: 10,
    marginBottom: 10
  }
}));