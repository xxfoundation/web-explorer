import React from "react";

import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from "./search/searchBar";
import { Nav } from "./menus/mainMenu";
import logo from '../assets/logos/xx-network-logo--white.svg';
import logoColor from '../assets/logos/xx-network-logo--color.svg';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from "../themes/header";

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
                <Grid container justifyContent="space-between" sx={{ mb: 5, }}>
                    <Grid item>
                        {themeMode === 'dark' ? 
                            <img src={logo} alt="xx network" /> 
                        : 
                            <img src={logoColor} alt="xx network" />
                        }
                    </Grid>
                    <Grid item>
                        <Nav />
                    </Grid>
                </Grid>
                <SearchBar />
            </Container>
        </Root>
    </ThemeProvider>
    
);
export default Header;