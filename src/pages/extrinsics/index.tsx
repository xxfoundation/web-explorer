import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import History from './History';
import ExtrinsicId from './_extrinsicId';

const ExtrinsicsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <History />
      </Route>
      <Route path={`${path}/:extrinsicId`}>
        <ExtrinsicId />
      </Route>
    </Switch>
  );
};

export default ExtrinsicsRouter;
