import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HistoryPage from './History';

const ExtrinsicsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <HistoryPage />
      </Route>
      <Route path={`${path}/:extrinsicId`}>
        {/* <ExtrinsicPage /> */}
        <h1>extrinsic page</h1>
      </Route>
    </Switch>
  );
};

export default ExtrinsicsRouter;
