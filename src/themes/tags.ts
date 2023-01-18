import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EA5400',
      light: '#FFF5D1',
      dark: '#D64D00',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#2581D6',
      light: '#2581D6',
      dark: '#FFFFFF',
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