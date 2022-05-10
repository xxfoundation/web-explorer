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
    </Switch>
  );
};

export default Accounts;
