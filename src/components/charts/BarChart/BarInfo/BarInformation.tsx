import { styled } from '@mui/material';

export default styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: theme.spacing(1),
  paddingBottom: 0,
  borderColor: theme.palette.grey[300],
  color: theme.palette.grey[400],
}));
