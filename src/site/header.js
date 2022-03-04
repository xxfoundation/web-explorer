import React from "react";

import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from "./search/searchBar";
import logo from '../assets/logos/xx-network-logo--white.svg';
import logoColor from '../assets/logos/xx-network-logo--color.svg';

//import { ThemeProvider } from '@mui/material/styles';
//import { theme } from "../themes/header";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...(mode === 'light'
        ? {
            main: "#00A2D6",
            contrastText: "##9A9A9A",
        }
        : {
            main: "#FFFFFF",
            contrastText: "#FFFFFF",
        }),
      },
      background: {
        default: "#E5E5E5",
        transparent: "rgba(255,255,255,0.24)",
      },
    },
    gradient: {
        ...(mode === 'light'
        ? {
            primary: "transparent",
        }
        : {
            primary: "linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)",
        }),
    },
    borders: {
        light: "1px solid #EAEAEA",
    },
});

const Root = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    background: theme.gradient.primary,
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
}));

// use this as a switch later when we put this on pages that get the dark theme
const themeMode = createTheme(getDesignTokens('light'));

const Header = () => (
    <ThemeProvider theme={themeMode}>
        <Root >
            <Container>
                <Grid container sx={{ mb: 5, }}>
                    <Grid item>
                        {themeMode === 'dark' ? 
                            <img src={logo} alt="xx network" /> 
                        : 
                            <img src={logoColor} alt="xx network" />
                        }
                    </Grid>
                    <Grid item>
                        nav
                    </Grid>
                </Grid>
                <SearchBar />
            </Container>
        </Root>
    </ThemeProvider>
    
);
export default Header;