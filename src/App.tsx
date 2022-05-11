import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SiteFooter from './components/Footer';
import SiteHeader from './components/Header';
import Accounts from './pages/accounts';
import Blocks from './pages/blocks';
import ExtrinsicsRouter from './pages/extrinsics';
import BlockChain from './pages/index';
import NotFound from './pages/NotFound';
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
            <Accounts />
          </Route>
          <Route path='/staking'>
            <Staking />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <SiteFooter />
      </ThemeProvider>
    </Router>
  );
}

export default App;
