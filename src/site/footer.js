import React from "react";

import { Container, Typography, Box } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// use theme in case we want to use dark mode later
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111111",
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#11cb5f',
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
    button: {
      fontSize: '2rem',
    },
  },
});

const Footer = () => (
    <ThemeProvider theme={theme}>
        <Container sx={{ backgroundColor: "background.default", color: "text.primary" }}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h2">Footer</Typography>
                <Button>Primary</Button>
                <Button color="secondary">Secondary</Button>
            </Box>
        </Container>
    </ThemeProvider>
);
export default Footer;