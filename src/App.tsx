import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SiteFooter from './components/Footer';
import SiteHeader from './components/Header';
import Blocks from './pages/blocks';
import ExtrinsicsRouter from './pages/extrinsics';
import BlockChain from './pages/index';
import Transfers from './pages/transfers';
import Staking from './pages/staking';
import { theme } from './themes/default';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SiteHeader />
        <Switch>
          <Route exact path='/'>
            <BlockChain />
          </Route>
          <Route path='/blocks'>
            <Blocks />
          </Route>
          <Route path='/extrinsics'>
            <ExtrinsicsRouter />
          </Route>
          <Route path='/transfers'>
            <Transfers />
          </Route>
          <Route path='/events'>
            <h1>events</h1>
          </Route>
          <Route path='/governance'>
            <h1>governance</h1>
          </Route>
          <Route path='/accounts'>
            <h1>accounts</h1>
          </Route>
          <Route path='/staking'>
            <Staking />
          </Route>
          {/* TODO configure 404 page */}
        </Switch>
        <SiteFooter />
      </ThemeProvider>
    </Router>
  );
}

export default App;
