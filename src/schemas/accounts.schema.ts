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

  // FIXME madeup field
  riotName?: string;
};

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
  identity: Identity; // TODO change database structure to a json type
  identityDisplay: string;
  identityDisplayParent: string;
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
  fragment account on account {
    id: account_id
    controllerAddress: controller_address
    whenCreated: when_created
    blockHeight: block_height
    identity
    identityDisplay: identity_display
    identityDisplayParent: identity_display_parent
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

export type ListAccounts = TotalOfItems & {
  account: {
    address: string;
    identity: Record<string, string>;
    timestamp: number;
    totalBalance: number;
    lockedBalance: number;
    nonce: number;
    roles: Record<Roles, boolean | string>;
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
      identity
      nonce
      roles: role {
        council
        nominator
        techcommit
        validator
        special
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
`
export type Nominator = {
  account_id: string;
  stake: string;
  share: string;
}

export type ValidatorStats = {
  era: number;
  stashAddress: string;
  rewardsAddress: string;
  commission: number;
  selfStake: number;
  otherStake: number;
  totalStake: number;
  nominators: Array<Nominator>;
  sessionKeys: string | null;
  cmixId: string | null;
  location: string | null;
  points: number | null;
  relativePerformance: number | null;
  reward: number | null;
}

const VALIDATOR_STATS_FRAGMENT = gql`
  fragment validatorStatsFragment on validator_stats {
    cmixId: cmix_id
    commission
    era
    location
    nominators
    otherStake: other_stake
    points
    relativePerformance: relative_performance
    reward
    rewardsAddress: rewards_address
    selfStake: self_stake
    sessionKeys: session_keys
    stashAddress: stash_address
    timestamp
    totalStake: total_stake
  }
`;

export type GetValidatorStats = {
  aggregates: { aggregate: { count: number } }
  stats: ValidatorStats[]
}

export const GET_VALIDATOR_STATS = gql`
  ${VALIDATOR_STATS_FRAGMENT}
  query GetValidatorStatsCount ($address: String!) {
    aggregates: validator_stats_aggregate(where: { stash_address: { _eq: $address }}) {
      aggregate {
        count
      }
    }

    stats: validator_stats(where: { stash_address: { _eq: $address } }, order_by: { era: desc }) {
      ...validatorStatsFragment
    }
  }
`;
