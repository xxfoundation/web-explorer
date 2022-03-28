
import React from 'react';
import { Container, Grid } from '@mui/material';
import SearchBar from './search/Bar';
import DesktopNav from './menus/Main';
import MobileNav from './menus/Mobile';

import logo from '../assets/logos/xx-network-logo--white.svg';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../themes/header';
import { GridContainer, Root } from './Header.styled';

// use this as a switch later when we put this on pages that get the dark theme
const theme = createTheme(getDesignTokens('light'));

const Header = () => (
  <ThemeProvider theme={theme}>
    <Root>
      <Container>
        <GridContainer container>
          <Grid item xs="auto" sx={{ display: { md: 'none', xs: 'block' } }}>
            <MobileNav />
          </Grid>
          <Grid item xs>
            <img src={logo} alt="xx network" />
          </Grid>
          <Grid item xs="auto" sx={{ display: { md: 'block', xs: 'none' } }}>
            <DesktopNav />
          </Grid>
        </GridContainer>
        <SearchBar />
      </Container>
    </Root>
  </ThemeProvider>
);
export default Header;
