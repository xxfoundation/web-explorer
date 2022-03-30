import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Block from './Block';
import BlocksPage from './BlocksPage';

const BlockRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <BlocksPage />
      </Route>
      <Route path={`${path}/:number`}>
        <Block />
      </Route>
    </Switch>
  );
};

export default BlockRouter;
