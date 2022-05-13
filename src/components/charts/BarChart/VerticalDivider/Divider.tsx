import { styled } from '@mui/material';

export default styled('hr')(({ theme }) => ({
  width: '1px',
  display: 'inline-block',
  flexGrow: 1,
  border: 'none',
  backgroundColor: theme.palette.grey[300]
}));