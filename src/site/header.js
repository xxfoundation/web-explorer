import React from "react";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchBar from "./search/searchBar";
import DesktopNav from "./menus/mainMenu";
import MobileNav from "./menus/mainMenuMobile";
import logo from "../assets/logos/xx-network-logo--white.svg";
import logoColor from "../assets/logos/xx-network-logo--color.svg";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../themes/header"; 

const Root = styled("div")(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    background: theme.gradient.primary,
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    paddingBottom: theme.spacing(5),
    justifyContent: "none",
    [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
    },
}));

// use this as a switch later when we put this on pages that get the dark theme
const themeMode = createTheme(getDesignTokens("light"));

const Header = () => (
    <ThemeProvider theme={themeMode}>
        <Root>
            <Container>
                <GridContainer container>
                    <Grid item xs="auto" sx={{ display: { md: "none", xs: "block" } }}>
                        <MobileNav />
                    </Grid>
                    <Grid item xs>
                        {themeMode === "dark" ? 
                            <img src={logo} alt="xx network" /> 
                            : 
                            <img src={logoColor} alt="xx network" />
                        }
                    </Grid>
                    <Grid item xs="auto" sx={{ display: { md: "block", xs: "none" } }}>
                        <DesktopNav />
                    </Grid>
                </GridContainer>
                <SearchBar />
            </Container>
        </Root>
    </ThemeProvider>
    
);
export default Header;