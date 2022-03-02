import React from "react";

import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from "./search/SearchBar";
import logo from '../assets/logos/xx-network-logo--white.svg';

const Root = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    background: theme.gradient.primary,
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
}));

const Header = () => (
    <Root>
        <Container>
            <Grid container sx={{ mb: 5, }}>
                <Grid item>
                    <img src={logo} alt="xx network" />
                </Grid>
                <Grid item>
                    nav
                </Grid>
            </Grid>
            <SearchBar />
        </Container>
    </Root>
    
);
export default Header;