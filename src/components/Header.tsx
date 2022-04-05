import { Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/logos/xx-network-logo--white.svg';
import logoColor from '../assets/logos/xx-network-logo--color.svg';
import { getDesignTokens } from '../themes/header';
import { GridContainer, Root } from './Header.styled';
import DesktopNav from './menus/Main';
import MobileNav from './menus/Mobile';
import SearchBar from './search/Bar';

const Header = () => {
  const { pathname } = useLocation();
  const theme = createTheme(getDesignTokens(pathname === '/' ? 'light' : 'dark'));
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Container>
          <GridContainer container>
            <Grid item xs='auto' sx={{ display: { sm: 'none', xs: 'block' } }}>
              <MobileNav />
            </Grid>
            <Grid item xs>
              <Link to='/'>
                {pathname === '/' ? <img src={logoColor} alt='xx network' /> : <img src={logoWhite} alt='xx network' />}
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
