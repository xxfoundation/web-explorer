import { ThemeOptions } from '@mui/material';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light'
        ? {
            main: '#00A2D6',
            contrastText: '##9A9A9A'
          }
        : {
            main: '#FFFFFF',
            contrastText: '#FFFFFF'
          })
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#E5E5E5',
    },
    grey: {
      A100: '#FFFFFF', // A100 -> A000
      900: '#D2D2D2' // 900 -> neutral
    }
  },
  borders: {
    light: '1px solid #EAEAEA'
  },
  typography: {
    h3: {
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 1.5,
    },
  },
});
