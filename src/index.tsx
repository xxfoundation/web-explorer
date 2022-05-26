import { ApolloClient, ApolloProvider, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
import { createClient } from 'graphql-ws';
import React from 'react';
import ReactDOM from 'react-dom';
import apolloCache from './apolloCache';
import App from './App';
import './dayjs';
import './charts';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SnackbarProvider from './SnackbarProvider';

const graphqlHost = process.env.REACT_APP_BACKEND_HOST || 'localhost:8080';

const httpLink = new HttpLink({ uri: `https://${graphqlHost}/v1/graphql` });
const wsLink = new GraphQLWsLink(
  createClient({ url: `wss://${graphqlHost}/v1/graphql`, disablePong: true })
);
const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <ApolloProvider
        client={
          new ApolloClient({
            link: splitLink,
            cache: apolloCache
          })
        }
      >
        <App />
      </ApolloProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
