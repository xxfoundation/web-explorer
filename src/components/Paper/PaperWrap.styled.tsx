import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export default styled(Paper)(({ theme }) => ({
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: (theme.shape.borderRadius as number) * 3,
  padding: '3rem', 
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem', 
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem', 
  },
}));