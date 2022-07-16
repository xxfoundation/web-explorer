import { gql } from '@apollo/client';
import { CommonFieldsRankingFragment } from './staking.schema';
import { TotalOfItems } from './types';

export type Roles = 'validator' | 'nominator' | 'council' | 'techcommit' | 'special';

export type Identity = {
  display?: string;
  displayParent?: string;
  email?: string;
  judgements?: Judgements[];
  legal?: string;
  riot?: string;
  blurb?: string;
  twitter?: string;
  web?: string;
  verified?: boolean;
};

export const GET_FULL_IDENTITY = gql`
  query GetFullIdentity($where: identity_bool_exp) {
    identity(where: $where) {
      display
      display_parent
      email
      judgements
      legal
      riot
      blurb
      twitter
      web
      verified
    }
  }
`

export const GET_DISPLAY_IDENTITY = gql`
  query GetDisplayIdentity($where: identity_bool_exp) {
    identity(where: where) {
      display
    }
  }
`

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

  identity: Identity;
  roles: Record<Roles, boolean>;
};

export type GetAccountByAddressType = {
  account: Account;
  ranking?: CommonFieldsRankingFragment[];
};

export const ACCOUNT_BY_PK_FRAGMENT = gql`
  fragment account on account {
    id: account_id
    controllerAddress: controller_address
    whenCreated: when_created
    blockHeight: block_height
    nonce
    timestamp
    roles: role {
      council
      nominator
      techcommit
      validator
      special
    }
    identity {
      blurb
      display
      display_parent
      email
      legal
      riot
      twitter
      web
      verified
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
    timestamp: number;
    totalBalance: number;
    lockedBalance: number;
    nonce: number;
    roles: Record<Roles, boolean | string>;
    identity: Identity;
  }[];
} & TotalOfItems;

export const LIST_ACCOUNTS = gql`
  query ListAccounts(
    $orderBy: [account_order_by!]
    $offset: Int
    $limit: Int
    $where: account_bool_exp
  ) {
    account: account(order_by: $orderBy, offset: $offset, limit: $limit, where: $where) {
      address: account_id
      timestamp
      totalBalance: total_balance
      lockedBalance: locked_balance
      nonce
      roles: role {
        council
        nominator
        techcommit
        validator
        special
      }
      identity: identity {
        display
      }
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
  query ListenForNewAccounts {
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
`