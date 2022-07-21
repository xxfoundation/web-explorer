import { gql } from '@apollo/client';
import { CommonFieldsRankingFragment } from './ranking.schema';
import { TotalOfItems } from './types';

export type Roles = 'validator' | 'nominator' | 'council' | 'techcommit' | 'special';

export type Identity = {
  display?: string;
  displayParent?: string;
  email?: string;
  judgements?: Judgements[];
  legal?: string;
  other?: unknown;
  parent?: string;
  twitter?: string;
  web?: string;
  blurb?: string;
  riotName?: string;
};

export const IDENTITY_FRAGMENT = gql`
  fragment identity on identity {
    display
    displayParent: display_parent
    email
    judgements
    legal
    other
    parent
    twitter
    web
    blurb
    riotName
  }
`;


type Judgements =
  | 'Unknown'
  | 'Reasonable'
  | 'Known Good'
  | 'Out of Date'
  | 'Low Quality'
  | 'Erroneous';

export type Account = {
  id: string;
  whenCreated: number;
  controllerAddress: string;
  blockHeight: number;
  identity: Identity;
  nonce: number;
  timestamp: number;
  lockedBalance: number;
  reservedBalance: number;
  totalBalance: number;
  bondedBalance: number;
  councilBalance: number;
  democracyBalance: number;
  transferrableBalance: number;
  unbondingBalance: number;
  vestingBalance: number;
  roles: Record<Roles, boolean>;
};

export type GetAccountByAddressType = {
  account: Account;
  ranking?: CommonFieldsRankingFragment[];
};

export const ACCOUNT_BY_PK_FRAGMENT = gql`
  ${IDENTITY_FRAGMENT}
  fragment account on account {
    id: account_id
    controllerAddress: controller_address
    whenCreated: when_created
    blockHeight: block_height
    identity {
      ...identity
    }
    nonce
    timestamp
    roles: role {
      council
      nominator
      techcommit
      validator
      special
    }

    lockedBalance: locked_balance
    reservedBalance: reserved_balance
    totalBalance: total_balance
    bondedBalance: bonded_balance
    councilBalance: council_balance
    democracyBalance: democracy_balance
    transferrableBalance: transferrable_balance
    unbondingBalance: unbonding_balance
    vestingBalance: vesting_balance
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
    identity: Identity | null;
    timestamp: number;
    totalBalance: number;
    lockedBalance: number;
    nonce: number;
    roles: Record<Roles, boolean | string>;
  }[];
} & TotalOfItems;

export const LIST_ACCOUNTS = gql`
  ${ACCOUNT_BY_PK_FRAGMENT}
  query ListAccounts(
    $orderBy: [account_order_by!]
    $offset: Int
    $limit: Int
    $where: account_bool_exp
  ) {
    account: account(order_by: $orderBy, offset: $offset, limit: $limit, where: $where) {
      ...account
    }
    agg: account_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export type NewAccounts = {
  newAccount: {
    accounts: string;
    block: {
      era: number;
    }
  }[]
}

export const LISTEN_FOR_NEW_ACCOUNTS = gql`
  subscription ListenForNewAccounts {
    newAccount: event(where: {call: {_eq: "NewAccount"}}, order_by: {block: {active_era: desc}}) {
      accounts: data
      block {
        era: active_era
      }
    }
  }
`;

export type GetExtrinsicCounts = {
  extrinsicCount: { aggregate: { count: number } };
  transferCount: { aggregate: { count: number } };
}

export const GET_EXTRINSIC_COUNTS = gql`
query GetExtrinsicCounts ($accountId: String) {
  extrinsicCount: extrinsic_aggregate(where: { signer: { _eq: $accountId } }) {
    aggregate {
      count
    }
  }

  transferCount:   transfer_aggregate(where: {
    _or: [
      { destination:  { _eq: $accountId } },
      { source:{ _eq: $accountId } }
    ]
  }) {
    aggregate {
      count
    }
  }
}
`;

export type SearchAccounts = {
  accounts: Account[]
}

export const SEARCH_ACCOUNTS = gql`
  ${ACCOUNT_BY_PK_FRAGMENT}
  query SearchAccounts($search: String) {
    accounts: account(where: {_or: [{account_id: {_like: $search }}, { identity: { display: { _ilike: $search } } }]}) {
      ...account
    }
  }
`;