import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.css';
import BlockChain from './pages/home';
import SiteFooter from './components/Footer';
import SiteHeader from './components/Header';
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
