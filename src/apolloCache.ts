import { InMemoryCache } from '@apollo/client';

const apolloCache = new InMemoryCache({
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

export default apolloCache;
