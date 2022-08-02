import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LandingPage from './LandingPage';

const Glossary: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <LandingPage />
      </Route>
    </Switch>
  );
};

export default Glossary;
