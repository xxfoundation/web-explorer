import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
import { createClient } from 'graphql-ws';

const graphqlHost = process.env.REACT_APP_BACKEND_HOST || 'localhost:8080';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blockchain_blocks_by_pk: {
          keyArgs: ['block_number'],
          merge: (existing = {}, incoming = {}) => {
            return { ...existing, ...incoming };
          }
        }
      }
    }
  }
});

function ApolloCli({ URI = `${graphqlHost}/v1/graphql` } = {}) {
  const httpLink = new HttpLink({ uri: `https://${URI}` });
  const wsLink = new GraphQLWsLink(createClient({ url: `wss://${URI}`, disablePong: true }));
  const splitLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );
  return new ApolloClient({
    link: splitLink,
    cache
  });
}

export default ApolloCli;
