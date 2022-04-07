import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Extrinsic from './Extrinsic';
import HistoryPage from './History';

const ExtrinsicsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <HistoryPage />
      </Route>
      <Route path={`${path}/:extrinsicId`}>
        <Extrinsic />
      </Route>
    </Switch>
  );
};

export default ExtrinsicsRouter;
