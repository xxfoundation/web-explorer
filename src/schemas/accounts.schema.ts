import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

export type Roles = 'validator' | 'nominator' | 'council' | 'technical committee' | 'treasury';

export type GetAccountIdentityByAddressType = {
  account: {
    id: string;
    identityDisplay: string;
    nonce: number;
  };
};

export const GET_ACCOUNT_IDENTITY_BY_ADDRESS = gql`
  query GetAccountIdentityByPK($accountId: String!) {
    account: account_by_pk(account_id: $accountId) {
      id: account_id
      identityDisplay: identity_display
      nonce
    }
  }
`;

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

  // madeup fields
  roles?: Roles[];
};

export type GetAccountByAddress = {
  account: Account;
};

export const ACCOUNT_BY_PK_FRAGMENT = gql`
  fragment account on account {
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
  query GetAccountByPK($accountId: String!) {
    account: account_by_pk(account_id: $accountId) {
      ...account
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
    // madeup fields
    roles?: Roles[];
  }[];
} & TotalOfItems;

export const LIST_ACCOUNTS = gql`
  query ListAccounts(
    $orderBy: [account_order_by!]
    $offset: Int
    $limit: Int
    $where: account_bool_exp
  ) {
    account(order_by: $orderBy, offset: $offset, limit: $limit, where: $where) {
      address: account_id
      timestamp
      availableBalance: available_balance
      lockedBalance: locked_balance
      nonce
    }
    agg: account_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
