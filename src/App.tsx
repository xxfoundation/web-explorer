import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.css';
import BlockChain from './blockchain';
import SiteFooter from './site/footer';
import SiteHeader from './site/header';
import { theme } from './themes/default';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SiteHeader />
      <BlockChain />
      <SiteFooter />
    </ThemeProvider>
  );
}

export default App;
