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

export const CREATION_EVENT_FRAGMENT = gql`
  fragment creation_event_fragment on account {
    creationEvent: events(where: {call: {_eq: "NewAccount"} }) {
      block {
        era
        block_number
        timestamp
      }
    }
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
  whenCreated: number;
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
  ${CREATION_EVENT_FRAGMENT}
  fragment account on account {
    id: account_id
    controllerAddress: controller_address
    ...creation_event_fragment
    whenCreated: when_created
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
type AccountKeys = 'id' | 'timestamp' | 'totalBalance' | 'lockedBalance' | 'nonce';
export type PartialAccount = { identity : PartialIdentity } & CreationEventFragment & Roles & Pick<Account, AccountKeys>;

export type ListAccounts = TotalOfItems & {
  events: { account: PartialAccount }[];
};

export const LIST_ACCOUNTS_FROM_EVENTS = gql`
  ${ROLES_FRAGMENT}
  ${CREATION_EVENT_FRAGMENT}
  query ListCreatedAccountsFromEvents(
    $offset: Int
    $limit: Int
    $where: event_bool_exp
  ) {
    events: event(offset: $offset, limit: $limit, where: $where) {
      account {
        id: account_id
        timestamp
        totalBalance: total_balance
        lockedBalance: locked_balance
        nonce
        ...roles_fragment
        identity: identity {
          display
        }
      ...creation_event_fragment
      }
    }
    
    agg: event_aggregate(where: $where) {
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

export type CreatedEras = {
  account: {
    era: number;
  }[];
  history: {
    latestEra: number;
  }[];
}

export const GET_WHEN_CREATED_ERAS = gql`
  ${CREATION_EVENT_FRAGMENT}
  query GetWhenCreatedEras {
    account { 
      ...creation_event_fragment
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
/*                          Staking Rewards Counters                          */
/* -------------------------------------------------------------------------- */
export type GetStakingRewardCounts = {
  rewardsInfo: { aggregate: { count: number, sum: { amount: number } } };
}

export const GET_STAKING_REWARDS_COUNTS = gql`
  query GetStakingRewardsCounts ($accountId: String) {
    rewardsInfo: staking_reward_aggregate(where: { account_id: { _eq: $accountId } }) {
      aggregate {
        count
        sum {
          amount
        }
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
