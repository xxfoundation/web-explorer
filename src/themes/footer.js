import { createTheme } from '@mui/material/styles';

// use theme in case we want to use dark mode later
export const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#111111",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#11cb5f",
      },
      text: {
          primary: "#ffffff",
      },
      background: {
          default: "#4F4F4F",
      },
    },
    typography: {
      h2: {
          fontSize: 36,
          fontWeight: 700,
      },
      body1: {
        fontSize: 14,
        color: "#D2D2D2",
      },
      button: {
        fontSize: "2rem",
      },
    },
  });