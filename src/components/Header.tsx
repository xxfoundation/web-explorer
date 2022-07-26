import { Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import logoColor from '../assets/images/logos/xx-network-logo--color.svg';
import logoWhite from '../assets/images/logos/xx-network-logo--white.svg';
import { getDesignTokens } from '../themes/header';
import { GridContainer, Root } from './Header.styled';
import Link from './Link';
import DesktopNav from './menus/Main';
import MobileNav from './menus/Mobile';
import SearchBar from './search/SearchBar';

const Header = () => {
  const { pathname } = useLocation();
  const theme = createTheme(getDesignTokens(pathname === '/' ? 'light' : 'dark'));
  
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Container sx={{ mt: { sm: '2.5em', xs: '7em' } }}>
          <GridContainer container>
            <Grid item xs='auto' sx={{ display: { sm: 'none', xs: 'block' } }}>
              <MobileNav />
            </Grid>
            <Grid item xs>
              <Link to='/'>
                {pathname === '/' ? (
                  <img src={logoColor} alt='xx network' />
                ) : (
                  <img src={logoWhite} alt='xx network' />
                )}
              </Link>
            </Grid>
            <Grid item xs='auto' sx={{ display: { sm: 'block', xs: 'none' } }}>
              <DesktopNav />
            </Grid>
          </GridContainer>
          <SearchBar />
        </Container>
      </Root>
    </ThemeProvider>
  );
};
export default Header;
