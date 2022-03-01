import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette:{
    background: {
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
});