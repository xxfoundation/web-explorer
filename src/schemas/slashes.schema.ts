import { gql } from '@apollo/client';

export type Slash = {
  accountId: string;
  amount: number;
  blockNumber: number;
  era: number;
  eventIndex: number;
  timestamp: number;
  validatorStashAddress: string;
};

export type GetSlashes = {
  slashes: Slash[];
}

export const GET_SLASHES_BY_ACCOUNT = gql`
  query GetSlashesByAccount($accountId: String!) {
    slashes: staking_slash(where: { account_id: {_eq:$accountId }}) {
      account_id
      amount
      block_number
      era
      event_index
      timestamp
      validator_stash_address
    }
  }
`;