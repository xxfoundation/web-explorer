import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BlockProducer from '../producer/_producerId';
import BlocksPage from './BlocksPage';
import Block from './_blockNumber';

const VersionRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Breadcrumb />
        <h1>version</h1>
      </Route>
      <Route path={`${path}/:module`}>
        <Breadcrumb />
        <h1>spec version</h1>
      </Route>
    </Switch>
  );
};

const BlockRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Block />
      </Route>
      <Route path={`${path}/producer/:producerId`}>
        <BlockProducer />
      </Route>
      <Route path={`${path}/version/:version`}>
        <VersionRouter />
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
