import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

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

export type GetAccountByAddressType = {
  account: {
    id: string;
    availableBalance: number;
    balances: string;
    blockHeight: number;
    freeBalance: number;
    identity: string;
    identityDisplay: string;
    identityDisplayParent: string;
    lockedBalance: number;
    nonce: number;
    reservedBalance: number;
    timestamp: number;
    totalBalance: number;
  };
};

export const GET_ACCOUNT_BY_PK = gql`
  query GetAccountByPK($accountId: String!) {
    account: account_by_pk(account_id: $accountId) {
      id: account_id
      availableBalance: available_balance
      balances
      blockHeight: block_height
      freeBalance: free_balance
      identity
      identityDisplay: identity_display
      identityDisplayParent: identity_display_parent
      lockedBalance: locked_balance
      nonce
      reservedBalance: reserved_balance
      timestamp
      totalBalance: total_balance
    }
  }
`;

export type ListAccounts = {
  account: { address: string; timestamp: number }[];
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
    }
    agg: account_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
