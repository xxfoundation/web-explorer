import { gql } from '@apollo/client';
import { ValidatorStats } from './staking.schema';
import { TotalOfItems } from './types';

/* ---------------------------- General Variables --------------------------- */
export type Roles = 'validator' | 'nominator' | 'council' | 'techcommit' | 'special';

type Judgements =
  | 'Unknown'
  | 'Reasonable'
  | 'Known Good'
  | 'Out of Date'
  | 'Low Quality'
  | 'Erroneous';

/* -------------------------------------------------------------------------- */
/*                                  Identity                                  */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                           Account Individual Page                          */
/* -------------------------------------------------------------------------- */
export type Account = {
  id: string;
  whenCreated: number;
  controllerAddress?: string;
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
  aggregates: { aggregate: { count: number } };
  stats: ValidatorStats[];
};

export const ACCOUNT_BY_PK_FRAGMENT = gql`
  fragment account on account {
    id: account_id
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

/* -------------------------------------------------------------------------- */
/*                        Account Page > Holders Table                        */
/* -------------------------------------------------------------------------- */
export type ListAccounts = TotalOfItems & {
  account: {
    address: string;
    timestamp: number;
    totalBalance: number;
    lockedBalance: number;
    nonce: number;
    roles: Record<Roles, boolean | string>;
    identity: Identity;
  }[];
};

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

/* -------------------------------------------------------------------------- */
/*                             New Accounts Chart                             */
/* -------------------------------------------------------------------------- */
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

export type CreatedEras = {
  account: {
    era: number;
  }[];
  history: {
    latestEra: number;
  }[];
}

export const GET_WHEN_CREATED_ERAS = gql`
  query ListenForNewAccounts {
    account {
      era: when_created_era
    }
    history: balance_history(order_by: {era: desc}, limit: 1) {
      latestEra: era
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                     Extrincs and Transfers Tab Counters                    */
/* -------------------------------------------------------------------------- */
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

    transferCount: transfer_aggregate(where: {
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

/* -------------------------------------------------------------------------- */
/*                               Balance History                              */
/* -------------------------------------------------------------------------- */
export type BalanceHistory = {
  era: number;
  totalBalance: number;
  // transferrableBalance: number;
  // reservedBalance: number;
  // lockedBalance: number;
  // bondedBalance: number;
  // unbondingBalance: number;
  // vestingBalance: number;
  // councilBalance: number;
  // democracyBalance: number;
}


export type GetBalanceHistory = {
  history: BalanceHistory[];
}

export const GET_BALANCE_HISTORY_BY_ID = gql`
  query GetBalanceHistoryByPk($accountId: String!) {
    history: balance_history(where: {account_id: {_eq: $accountId}}, order_by: {era: asc}) {
      era
      totalBalance: total_balance
    }
  }
`
