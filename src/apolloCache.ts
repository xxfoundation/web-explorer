import { InMemoryCache } from '@apollo/client';

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blocks_by_pk: {
          keyArgs: ['block_number'],
          merge: (existing = {}, incoming = {}) => {
            return { ...existing, ...incoming };
          }
        }
      }
    }
  }
});

export default apolloCache;
