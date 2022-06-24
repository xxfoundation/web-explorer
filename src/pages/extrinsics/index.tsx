import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Extrinsics from './Extrinsics';
import ExtrinsicId from './_extrinsicId';

const ExtrinsicsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Extrinsics />
      </Route>
      <Route path={`${path}/:extrinsicId`}>
        <ExtrinsicId />
      </Route>
    </Switch>
  );
};

export default ExtrinsicsRouter;
