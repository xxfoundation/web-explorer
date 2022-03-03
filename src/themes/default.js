import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette:{
    background: {
      default: "#E5E5E5",
      transparent: "rgba(255,255,255,0.24)",
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
      marginBottom: 24,
    },
    h4: {
      fontSize: 12,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
    },
  },
  gradient: {
    primary: "linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)",
  },
  shape: {
    borderRadius: 30,
    borderRadius: 30,
  },
  shadows: {
    box: "0px 35px 84px 3px rgba(0, 0, 0, 0.04);",
  },
});