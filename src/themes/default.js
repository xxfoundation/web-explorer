import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette:{
    primary: {
      main: "#00A2D6", // sets link color
      contrastText: "#FFF",
    },
    background: {
      default: "#E5E5E5",
      transparent: "rgba(255,255,255,0.24)",
    },
    // color coding used for metrics
    veryGood: {
      main: "#7BE03D",
    },
    good: {
      main: "#08CDD7",
    },
    neutral: {
      main: "#D2D2D2",
    },
    bad: {
      main: "#FA7A03",
    },
    veryBad: {
      main: "#FF4141",
    },
  },
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
    h3: {
      fontSize: 16,
      fontWeight: 700,
      textTransform: "uppercase",
    },
    h4: {
      fontSize: 12,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    body1: { // normal text
      fontWeight: 500,
    },
    body2: { // small & bold
      fontWeight: 700,
      fontSize: 14,
      color: "#7A7A7A",
    },
    body3: { // small & normal
      fontWeight: 400,
      fontSize: 14,
      color: "#7A7A7A",
    },
    body4: { // very small & normal
      fontWeight: 400,
      fontSize: 12,
    },
    button: {
      fontWeight: 600,
    },
  },
  gradient: {
    primary: "linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)",
  },
  shape: {
    borderRadius: 4,
    borderRadiusLarge: 30,
  },
  shadows: {
    box: "0px 35px 84px 3px rgba(0, 0, 0, 0.04)",
  },
  borders: {
    light: "1px solid #EAEAEA",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 24,
        },
      },
    },
  },

});