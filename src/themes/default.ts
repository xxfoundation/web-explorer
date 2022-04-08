import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 24
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#00A2D6', // sets link color
      contrastText: '#FFF'
    },
    text: {
      primary: '#4f4f4f'
    },
    grey: {
      50: '#FFFFFF',
      100: '#FCFCFC', // light backgrounds
      200: '#EAEAEA', // line grey
      300: '#D2D2D2', // grey
      400: '#9A9A9A', // med grey 2
      500: '#7A7A7A', // med grey
      600: '#4F4F4F', // backgrounds
      700: '#3D3D3D', // dark grey
      800: '#27272B' // black header
    },
    // color coding used for metrics
    veryGood: {
      main: '#7BE03D'
    },
    good: {
      main: '#08CDD7'
    },
    neutral: {
      main: '#D2D2D2'
    },
    bad: {
      main: '#FA7A03'
    },
    veryBad: {
      main: '#FF4141'
    }
  },
  typography: {
    fontFamily: '\'Roboto\', sans-serif',
    h1: {
      fontSize: 36,
      fontWeight: 700,
      color: '#3D3D3D'
    },
    h2: {
      fontSize: 36,
      fontWeight: 700
    },
    h3: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: '#4f4f4f'
    },
    h4: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    },
    h5: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    h6: {
      fontSize: 12,
      fontWeight: 400,
    },
    body1: {
      // normal text
      fontWeight: 500
    },
    body2: {
      // small & bold
      fontWeight: 700,
      fontSize: 14,
      color: '#7A7A7A'
    },
    body3: {
      // normal weight text
      fontWeight: 400,
      fontSize: 14,
      color: '#7A7A7A'
    },
    body4: {
      // very small & normal
      fontWeight: 400,
      fontSize: 12
    },
    body5: {
      // tiny & normal
      fontWeight: 400,
      fontSize: 10
    },
    button: {
      fontWeight: 500
    }
  },
  gradients: {
    primary:
      'linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)'
  },
  shape: {
    borderRadius: 11
  },
  borders: {
    light: '1px solid #EAEAEA'
  },
  boxShadow: '0px 35px 84px 3px rgba(0, 0, 0, 0.04)'
});

export type { Theme } from '@mui/material';
