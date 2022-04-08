import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EA5400',
      light: '#FFF5D1',
      dark: '#D64D00',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontSize: 12
  },
  shape: {
    borderRadius: 5
  }
});