import * as Sentry from '@sentry/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import './App.css';
import './plugins';
import SiteFooter from './components/Footer';
import SiteHeader from './components/Header';
import Glossary from './pages/glossary';
import NotFound from './pages/NotFound';
import Banner from './components/Banner';
import Redirect from './components/Redirect';
import { Stack, Typography } from '@mui/material';

const Maintenance = () => {
  return (
    <Stack paddingTop={2} alignItems={'center'}>
      <Typography variant='h2'>Explorer is under maintenance...</Typography>
    </Stack>
  )
}

const App = () => (
  <Router>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Banner/>
      <SiteHeader />
      <Routes>
        <Route index element={<Maintenance />} />
        <Route path='blocks'>
          <Route index element={<Maintenance />} />
          <Route path=':numberOrHash'>
            <Route index  element={<Maintenance />} />
            <Route path={'producer/:accountId'} element={<Maintenance />} />
          </Route>
        </Route>
        <Route path='extrinsics'>
          <Route index element={<Maintenance />} />
          <Route path=':extrinsicIdOrHash' element={<Maintenance />} />
        </Route>
        <Route path='transfers' element={<Maintenance />} />
        <Route path='events' element={<Maintenance />} />
        <Route path='accounts'>
          <Route index element={<Maintenance />} />
          <Route path=':accountId' element={<Maintenance />} />
        </Route>
        <Route path='staking' element={<Maintenance />} />
        <Route path='glossary' element={<Glossary />} />
        <Route path='staking/simple' element={<Redirect />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </QueryParamProvider>
  </Router>
);


export default Sentry.withProfiler(App);
