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
