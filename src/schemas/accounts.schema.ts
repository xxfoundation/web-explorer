import { gql } from '@apollo/client';
import { CommonFieldsRankingFragment, COMMON_FIELDS_RANKING_FRAGMENT } from './ranking.schema';
import { TotalOfItems } from './types';

export type Roles = 'validator' | 'nominator' | 'council' | 'technical committee' | 'treasury';

export type Account = {
  id: string;
  blockHeight: number;
  identity: string;
  identityDisplay: string;
  identityDisplayParent: string;
  nonce: number;
  timestamp: number;
  balances: string;

  availableBalance: number;
  freeBalance: number;
  lockedBalance: number;
  reservedBalance: number;
  totalBalance: number;

  roles?: Roles[];
};

export type GetAccountByAddress = {
  account: Account;
  ranking?: CommonFieldsRankingFragment;
};

export const ACCOUNT_BY_PK_FRAGMENT = gql`
  fragment account on blockchain_account {
    id: account_id
    blockHeight: block_height
    identity
    identityDisplay: identity_display
    identityDisplayParent: identity_display_parent
    nonce
    timestamp
    balances

    availableBalance: available_balance
    freeBalance: free_balance
    lockedBalance: locked_balance
    reservedBalance: reserved_balance
    totalBalance: total_balance
  }
`;

export const GET_ACCOUNT_BY_PK = gql`
  ${ACCOUNT_BY_PK_FRAGMENT}
  ${COMMON_FIELDS_RANKING_FRAGMENT}
  query GetAccountByPK($accountId: String!) {
    account: blockchain_account_by_pk(account_id: $accountId) {
      ...account
      ranking {
        ...ranking
      }
    }
  }
`;

export type ListAccounts = {
  account: {
    address: string;
    timestamp: number;
    availableBalance: number;
    lockedBalance: number;
    nonce: number;
    roles?: Roles[];
  }[];
} & TotalOfItems;

export const LIST_ACCOUNTS = gql`
  query ListAccounts(
    $orderBy: [blockchain_account_order_by!]
    $offset: Int
    $limit: Int
    $where: blockchain_account_bool_exp
  ) {
    account: blockchain_account(order_by: $orderBy, offset: $offset, limit: $limit, where: $where) {
      address: account_id
      timestamp
      availableBalance: available_balance
      lockedBalance: locked_balance
      nonce
    }
    agg: blockchain_account_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
