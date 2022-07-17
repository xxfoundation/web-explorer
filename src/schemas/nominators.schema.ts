import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

export type GetNominatorsOfAccount = {
  nominations: {
    share: string;
    stake: string;
    stashAddress: string;
    accountId: string;
  }[];
} & TotalOfItems;

export const GET_NOMINATORS_OF_ACCOUNT = gql`
  query GetNominatorsOfAccount($limit: Int!, $offset: Int!, $stashAddress: String) {
    nominations(
      order_by: { account_id: asc }
      limit: $limit
      offset: $offset
      where: { stash_address: { _eq: $stashAddress } }
    ) {
      share
      stake
      stashAddress: stash_address
      accountId: account_id
    }
  }
`;
