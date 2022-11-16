import { gql } from '@apollo/client';
import { ValidatorStats } from './staking.schema';
import { TotalOfItems } from './types';

/* -------------------------------------------------------------------------- */
/*                                  Identity                                  */
/* -------------------------------------------------------------------------- */
type Judgements =
  | 'Unknown'
  | 'Reasonable'
  | 'Known Good'
  | 'Out of Date'
  | 'Low Quality'
  | 'Erroneous';


export type Identity = {
  blurb?: string;
  display?: string;
  displayParent?: string;
  email?: string;
  judgements?: Judgements[];
  legal?: string;
  riot?: string;
  twitter?: string;
  verified?: boolean;
  web?: string;
};

export type Roles = {
  council: boolean;
  nominator: boolean;
  special: string | null;
  techcommit: boolean;
  validator: boolean;
}

export const ROLES_FRAGMENT = gql`
  fragment roles_fragment on account {
    techcommit
    special
    nominator
    council
    validator
  }
`

export const IDENTITY_FRAGMENT = gql`
  fragment identity on identity {
    blurb
    display
    discord
    displayParent: display_parent
    email
    judgements
    legal
    riot
    twitter
    verified
    web
  }
`;

export type CreationEventFragment = {
  creationEvent: {
    block: {
      era: number;
      number: number;
      timestamp: number;
    }
  }[]
}

export const GET_FULL_IDENTITY = gql`
  ${IDENTITY_FRAGMENT}
  query GetFullIdentity($where: identity_bool_exp) {
    identity(where: $where) {
      ...identity
    }
  }
`

export type GetDisplayIdentity = {
  account: {
    council: boolean;
    nominator: boolean;
    special: string;
    techcommit: boolean;
    validator: boolean;
    identity: {
      display: string;
    }
  }[]
}
export const GET_DISPLAY_IDENTITY = gql`
  query GetDisplayIdentity($account: String!) {
    account(where: { account_id: { _eq: $account } }) {
      ...roles_fragment
      identity {
        display
      }
    }
  }
`

/* -------------------------------------------------------------------------- */
/*                           Account Individual Page                          */
/* -------------------------------------------------------------------------- */
export type Account = CreationEventFragment & Roles & {
  id: string;
  active: boolean;
  whenCreated: number;
  whenKilled: number;
  controllerAddress?: string;
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
};

export type GetAccountByAddressType = {
  account: Account;
  aggregates: { aggregate: { count: number } };
  stats: ValidatorStats[];
};

export const ACCOUNT_FRAGMENT = gql`
  ${IDENTITY_FRAGMENT}
  ${ROLES_FRAGMENT}
  fragment account on account {
    id: account_id
    controllerAddress: controller_address
    active
    whenCreated: when_created
    whenKilled: when_killed
    blockHeight: block_height
    identity {
      ...identity
    }
    nonce
    timestamp
    ...roles_fragment
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
  ${ACCOUNT_FRAGMENT}
  query GetAccountByPK($accountId: String!) {
    account: account_by_pk(account_id: $accountId) {
      ...account
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                        Account Page > Holders Table                        */
/* -------------------------------------------------------------------------- */
type PartialIdentity = Pick<Identity, 'display'>;
type AccountKeys = 'id' | 'nonce' | 'lockedBalance' | 'totalBalance' | 'whenCreated';
export type PartialAccount = { identity : PartialIdentity } & Roles & Pick<Account, AccountKeys>;

export type ListAccounts = TotalOfItems & {
  account: PartialAccount[];
};

export const LIST_ACCOUNTS = gql`
  ${ROLES_FRAGMENT}
  query ListAccounts(
    $orderBy: [account_order_by!]
    $offset: Int
    $limit: Int
    $where: account_bool_exp
  ) {
    account(order_by: $orderBy, offset: $offset, limit: $limit, where: $where) {
      id: account_id
      timestamp
      totalBalance: total_balance
      lockedBalance: locked_balance
      whenCreated: when_created
      nonce
      ...roles_fragment
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
    newAccount: event(where: {call: {_eq: "NewAccount"}}, order_by: {block: {era: desc}}) {
      accounts: data
      block {
        era
      }
    }
  }
`;

export type CreatedAccounts = {
  account: {
    timestamp: number;
  }[];
  history: {
    latestEra: number;
  }[];
}

export const GET_WHEN_CREATED_ACCOUNTS = gql`
  query GetWhenCreatedAccounts {
    account(order_by: {timestamp: desc}) { 
      timestamp
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
  balanceCount: { aggregate: { count: number } };
}

export const GET_EXTRINSIC_COUNTS = gql`
  query GetExtrinsicCounts ($accountId: String) {
    extrinsicCount: extrinsic_aggregate(where: { signer: { _eq: $accountId } }) {
      aggregate {
        count
      }
    }
    
    balanceCount: event_aggregate(where: { account_id: {_eq: $accountId}, module: {_eq:"balances"} }) {
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
/*                     Events Tab Counters                    */
/* -------------------------------------------------------------------------- */
export type GetEventsCounts = {
  technicalCommittee: { aggregate: { count: number } };
  councilElections: { aggregate: { count: number } };
  democracy: { aggregate: { count: number } };
  treasury: { aggregate: { count: number } };
  tips: { aggregate: { count: number } };
}

export const GET_EVENTS_COUNTS = gql`
query GetModules ($accountId: String) {
  technicalCommittee: event_aggregate(where: { account_id: {_eq: $accountId}, module: {_eq: "technicalCommittee" }}) {
    aggregate {
      count
    }
  }
  councilElections: event_aggregate(where: { account_id: {_eq: $accountId}, _and: {_or: [{module: {_eq: "council"}}, {module: {_eq: "elections"}}]}}) {
    aggregate {
      count
    }
  }
  democracy: event_aggregate(where: { account_id: {_eq: $accountId}, module: {_eq: "democracy" }}) {
    aggregate {
      count
    }
  }
  treasury: event_aggregate(where: { account_id: {_eq: $accountId}, module: {_eq: "treasury" }}) {
    aggregate {
      count
    }
  }
  tips: event_aggregate(where: { account_id: {_eq: $accountId}, module: {_eq: "treasury" }}) {
    aggregate {
      count
    }
  }
}
`
/* -------------------------------------------------------------------------- */
/*                     Events List                    */
/* -------------------------------------------------------------------------- */
export type GetEventsList = {
  event: []
}

export const GET_EVENTS_LIST = gql`
  query GetEventsList ($orderBy: [event_order_by!], $where: event_bool_exp) {
    event(order_by: $orderBy, where: $where) {
      blockNumber: block_number
      index: event_index
      timestamp
      module
      call
      data 
      doc
  }
}
`

/* -------------------------------------------------------------------------- */
/*                          Staking Rewards Counters                          */
/* -------------------------------------------------------------------------- */
export type GetStakingCounts = {
  rewards: { aggregate: { count: number, sum: { amount: number } } };
  slashes: { aggregate: { count: number, sum: { amount: number } } };
  stakingEvents: { aggregate: { count: number }};
}

export const GET_STAKING_COUNTS = gql`
  query GetStakingRewardsCounts ($accountId: String) {
    rewards: staking_reward_aggregate(where: { account_id: { _eq: $accountId } }) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
    slashes: staking_slash_aggregate(where: { account_id: { _eq: $accountId } }) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }
    stakingEvents: event_aggregate(where: { account_id: {_eq: $accountId}, module: {_eq: "staking" }}) {
      aggregate {
        count
      }
    }
  }
`

/* -------------------------------------------------------------------------- */
/*                               Balance History                              */
/* -------------------------------------------------------------------------- */

export type SearchAccounts = {
  accounts: Account[]
}

export const SEARCH_ACCOUNTS = gql`
  ${ACCOUNT_FRAGMENT}
  query SearchAccounts($search: String) {
    accounts: account(where: {_or: [{account_id: {_ilike: $search }}, { identity: { display: { _ilike: $search } } }]}) {
      ...account
    }
  }
`;

export type BalanceHistory = {
  era: number;
  total: number;
  transferrable: number;
  unbonding: number;
  reserved: number
  locked: number;
  bonded: number;
  vesting: number;
  council: number;
  democracy: number;
}

export type GetBalanceHistory = {
  history: BalanceHistory[];
}

export const GET_BALANCE_HISTORY_BY_ID = gql`
  query GetBalanceHistoryByPk($accountId: String!) {
    history: balance_history(where: {account_id: {_eq: $accountId}}, order_by: {era: asc}) {
      era
      total: total_balance
      transferrable: transferrable_balance
      unbonding: unbonding_balance
      reserved: reserved_balance
      locked: locked_balance
      bonded: bonded_balance
      vesting: vesting_balance
      council: council_balance
      democracy: democracy_balance
    }
  }
`

export const GET_SUBACCOUNT_COUNTS = gql`
  ${IDENTITY_FRAGMENT}
  
`
