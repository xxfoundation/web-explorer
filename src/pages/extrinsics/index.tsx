import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Extrinsics from './Extrinsics';
import ExtrinsicId from './_extrinsicIdOrHash';

const ExtrinsicsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Extrinsics />
      </Route>
      <Route path={`${path}/:extrinsicIdOrHash`}>
        <ExtrinsicId />
      </Route>
    </Switch>
  );
};

export default ExtrinsicsRouter;
