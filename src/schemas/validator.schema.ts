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

export type GetCommissionAvg = {
  stats: {
    aggregate: {
      avg: {
        commission: number
      }
    }
  }
}


export const GET_COMMISSION_AVG = gql`
  query ValidatorCommissionAvg($accountId: String!) {
    stats: validator_stats_aggregate(where: {stash_address: {_eq: $accountId}}) {
      aggregate {
        avg {
          commission
        }
      }
    }
  }
`;

export type GetPayoutFrequency = {
  extrinsic: {
    aggregate: {
      count: number
    }
  }
};

export const GET_PAYOUT_FREQUENCY = gql`
  query GetPayoutFrequency($accountId: String!) {
    extrinsic: extrinsic_aggregate(where: {signer: {_eq: $accountId}, call: { _eq: "payoutStakers"}}) {
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