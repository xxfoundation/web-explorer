import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif",
    h1: {
      fontSize: 36,
      fontWeight: 800,
    },
    h2: {
      fontSize: 36,
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});