import { gql } from '@apollo/client';

export const LISTEN_FOR_ERA_POINTS = gql`
  subscription ListenForEraPoints($stashAddress: String!) {
    eraPoints: era_points(where: { stash_address: { _eq: $stashAddress } }) {
      era
      points
    }
  }
`;

export const LISTEN_FOR_RELATIVE_PERFORMANCE = gql`
  subscription ListenForRelativePerformance($stashAddress: String!) {
    eraRelativePerformances: era_relative_performance(
      where: { stash_address: { _eq: $stashAddress } }
    ) {
      era
      relativePerformance: relative_performance
    }
  }
`;

export const LISTEN_FOR_ERA_COMMISSION = gql`
  subscription ListenForEraComissions($stashAddress: String!) {
    eraCommissions: era_commission(where: { stash_address: { _eq: $stashAddress } }) {
      era
      commission
    }
  }
`;

export const LISTEN_FOR_ELECTED_SELF_STAKE = gql`
  subscription ListenForElectedSelfStake($stashAddress: String!) {
    eraSelfStake: era_self_stake(where: { stash_address: { _eq: $stashAddress } }) {
      era
      selfStake: self_stake
    }
  }
`;

export type GetValidatorCommission = {
  validator: {
    commission: number
  }[]
}


export const GET_VALIDATOR_COMMISSION = gql`
  query ValidatorCommission($accountId: String!) {
    validator(where: {stash_address: {_eq: $accountId}}) {
      commission
    }
  }
`;

export type GetAvgValidatorRelativePerformance = {
  stats: {
    aggregate: {
      avg: {
        relativePerformance: number
      }
    }
  }
}

export const GET_AVG_VALIDATOR_RELATIVE_PERFOMANCE = gql`
  query ValidatorCommission($accountId: String!, $eraRange: Int!) {
    stats: validator_stats_aggregate(where: {stash_address: {_eq: $accountId}, _and: {era: {_gte: $eraRange}}}, order_by: {era: desc}) {
      aggregate {
        avg {
          relativePerformance: relative_performance
        }
      }
    }
  }
`;

export type GetPayoutFrequency = {
  stats: {
    aggregate: {
      count: number
    }
  }
  rewards: {
    aggregate: {
      count: number
    }
  }
};

export const GET_PAYOUT_FREQUENCY = gql`
  query GetPayoutFrequency($accountId: String!, $eraRange: Int!) {
    stats: validator_stats_aggregate(where: {stash_address: {_eq: $accountId}, _and: {era: {_gte: $eraRange}}}) {
      aggregate {
        count
      }
    }
    rewards: staking_reward_aggregate(where: {validator_id: {_eq: $accountId}, _and: {era: {_gte: $eraRange}}}, distinct_on: era) {
      aggregate {
        count
      }
    }
  }
`;

const VALIDATOR_INFO_FRAGMENT = gql`
  fragment validatorInfoFragment on validator {
    stashAddress: stash_address
    rewardsAddress: rewards_address
    account {
      identity {
        display
      }
    }
    active
    stake
    commission
    blocking
    nominators
    sessionKeys: session_keys
    cmixId: cmix_id
    location
    timestamp
  }
`;


export type ValidatorInfo = {
  stashAddress: string;
  rewardAddress: string;
  account: {
    identity: null | {
      display: string;
    }
  }
  active: boolean;
  stake: string;
  commission: number;
  blocking: boolean;
  nominators: string[];
  sessionKeys: string | null;
  cmixId: string;
  location: string;
  timestamp: string;
};

export type GetValidatorInfo = {
  validator: ValidatorInfo[];
}

export const GET_VALIDATOR_INFO = gql`
  ${VALIDATOR_INFO_FRAGMENT}
  query GetValidatorInfo($accountId: String!) {
    validator(where: { stash_address: { _eq: $accountId }}) {
      ...validatorInfoFragment
    }
  }
`