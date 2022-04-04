import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Block from './Block';
import BlocksPage from './BlocksPage';
import BlockProducer from './Producer';

const BlockRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Block />
      </Route>
      <Route path={`${path}/producer/:nameOrId`}>
        <BlockProducer />
      </Route>
    </Switch>
  );
};

const BlocksListRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <BlocksPage />
      </Route>
      <Route path={`${path}/:number`}>
        <BlockRouter />
      </Route>
    </Switch>
  );
};

export default BlocksListRouter;
