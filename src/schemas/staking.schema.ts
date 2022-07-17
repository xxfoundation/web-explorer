import { gql } from '@apollo/client';

/* ------------------------------ General Types ----------------------------- */
export type Nominator = {
  accountId: string;
  stake: string;
  share: string;
}

/* -------------------------------------------------------------------------- */
/*                       Staking Page > Validators Table                      */
/* -------------------------------------------------------------------------- */

export type LatestEraQuery = {
  validatorStats: { era: number }[]
}

export const GET_LATEST_ERA = gql`
  query GetRankedAccounts {
    validatorStats: validator_stats(limit: 1, order_by: {era: desc}) {
      era
    }
  }
`;
/* ------------------------------------ - ----------------------------------- */

export type ValidatorAccount = {
  addressId: string;
  location: string;
  cmixId: string;
  nominators: Nominator[];
  ownStake: string;
  totalStake: string;
  otherStake: string;
};

export type ValidatorAccountsQuery = {
  validators: ValidatorAccount[];
};

export type ActiveCountsQuery = {
  active: { aggregate: { count: number } };
  waiting: { aggregate: { count: number } };
}

export const GET_ACTIVE_COUNTS = gql`
  query ActiveCounts($era: Int!) {
    active: validator_stats_aggregate(where: { era: { _eq: $era }}) {
      aggregate {
        count
      }
    }

    waiting: waiting_aggregate {
      aggregate {
        count
      }
    }
  }
`

export const GET_CURRENT_VALIDATORS = gql`
  query GetCurrentValidators($limit: Int!, $offset: Int!, $where: validator_stats_bool_exp) {
    validators: validator_stats(limit: $limit, offset: $offset, where: $where, order_by: { total_stake: desc }) {
      nominators
      location
      cmixId: cmix_id
      ownStake: self_stake
      totalStake: total_stake
      otherStake: other_stake
      addressId: stash_address
    }
  }
`;

export const GET_WAITING_LIST = gql`
  query GetWaitingList {
    validators: waiting(order_by: { self_stake: desc }) {
      nominators
      location
      cmixId: cmix_id
      ownStake: self_stake
      addressId: stash_address
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                        Account Page > Validator Info                       */
/* -------------------------------------------------------------------------- */

export type ValidatorStats = {
  era: number;
  stashAddress: string;
  rewardsAddress: string;
  commission: number;
  selfStake: number;
  otherStake: number;
  totalStake: number;
  nominators: Nominator[];
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
  query GetValidatorStats ($address: String!) {
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

export const GET_VALIDATOR_INFO = gql`
  ${VALIDATOR_STATS_FRAGMENT}
  query GetValidatorInfo ($address: String!) {
    stats: validator_stats(where: { stash_address: { _eq: $address } }, order_by: { era: desc }, limit: 1) {
      ...validatorStatsFragment
    }
  }
`