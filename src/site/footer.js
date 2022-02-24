import React from "react";

import { Container, Typography, Box } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assets/logos/xx-network-logo--white.svg';

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
        <Box 
            sx={{ 
                p: 3,
                backgroundColor: "background.default", 
                color: "text.primary" 
            }}
        >
            <Container>
                <img src={logo} alt="xx network" />
                <Typography variant="h2">Footer</Typography>
            </Container>
        </Box>
    </ThemeProvider>
);
export default Footer;