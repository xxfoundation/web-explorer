import { Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import logo from '../assets/logos/xx-network-logo--white.svg';
import { getDesignTokens } from '../themes/header';
import { GridContainer, Root } from './Header.styled';
import Link from './Link';
import DesktopNav from './menus/Main';
import MobileNav from './menus/Mobile';
import SearchBar from './search/Bar';

// use this as a switch later when we put this on pages that get the dark theme
const theme = createTheme(getDesignTokens('light'));

const Header = () => (
  <ThemeProvider theme={theme}>
    <Root>
      <Container>
        <GridContainer container>
          <Grid item xs='auto' sx={{ display: { md: 'none', xs: 'block' } }}>
            <MobileNav />
          </Grid>
          <Grid item xs>
            <Link to='/'><img src={logo} alt='xx network' /></Link>
          </Grid>
          <Grid item xs='auto' sx={{ display: { md: 'block', xs: 'none' } }}>
            <DesktopNav />
          </Grid>
        </GridContainer>
        <SearchBar />
      </Container>
    </Root>
  </ThemeProvider>
);
export default Header;
