import { gql } from '@apollo/client';

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
