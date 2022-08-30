import * as Sentry from '@sentry/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import './App.css';
import './plugins';
import SiteFooter from './components/Footer';
import SiteHeader from './components/Header';
import Accounts from './pages/accounts';
import Glossary from './pages/glossary';
import Blocks from './pages/blocks';
import EventsHistory from './pages/events';
import Extrinsics from './pages/extrinsics';
import BlockChain from './pages/index';
import NotFound from './pages/NotFound';
import Staking from './pages/staking';
import StakingSimple from './pages/staking/simple';
import Transfers from './pages/transfers';
import AccountId from './pages/accounts/_accountId';
import Block from './pages/blocks/_blockNumberOrHash';
import ExtrinsicComponent from './pages/extrinsics/_extrinsicIdOrHash';

import Banner from './components/Banner';

const App = () => (
  <Router>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Banner/>
      <SiteHeader />
      <Routes>
        <Route index element={<BlockChain />} />
        <Route path='blocks'>
          <Route index element={<Blocks />} />
          <Route path=':numberOrHash'>
            <Route index  element={<Block />} />
            <Route path={'producer/:accountId'} element={<AccountId />} />
          </Route>
        </Route>
        <Route path='extrinsics'>
          <Route index element={<Extrinsics />} />
          <Route path=':extrinsicIdOrHash' element={<ExtrinsicComponent />} />
        </Route>
        <Route path='transfers' element={<Transfers />} />
        <Route path='events' element={<EventsHistory />} />
        <Route path='accounts'>
          <Route index element={<Accounts />} />
          <Route path=':accountId' element={<AccountId />} />
        </Route>
        <Route path='staking' element={<Staking />} />
        <Route path='glossary' element={<Glossary />} />
        <Route path='staking/simple' element={<StakingSimple />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </QueryParamProvider>
  </Router>
);


export default Sentry.withProfiler(App);
