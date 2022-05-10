import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LandingPage from './LandingPage';
import AccountId from './_accountId';

const Accounts: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <LandingPage />
      </Route>
      <Route path={`${path}/:accountId`}>
        <AccountId />
      </Route>
      {/* <Route path={`${path}/nominator`}>
        <h1>nominator</h1>
      </Route>
      <Route path={`${path}/validator`}>
        <h1>validator</h1>
      </Route>
      <Route path={`${path}/council`}>
        <h1>council</h1>
      </Route>
      <Route path={`${path}/tech-committee`}>
        <h1>tech committee</h1>
      </Route> */}
    </Switch>
  );
};

export default Accounts;
