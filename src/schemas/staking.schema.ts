import type { EraPointsHistory } from '../pages/producer/types';
import { gql } from '@apollo/client';

export type CommonFieldsRankingFragment = {
  era: number;
  identity: string;
  activeEras: number;

  // summary  
  stashAddress: string;
  controllerAddress: string;
  rewardsAddress: string;
  cmixId: string;
  location: string;
  selfStake: number;
  otherStake: number;
  totalStake: number;
  nominators: number;
  commission: string;
  sessionKeys: string;

  // tabs
  nominations: string;
  eraPointsHistory: EraPointsHistory;
};

export type GetAccountRanking = {
  ranking: CommonFieldsRankingFragment[];
};

export const GET_ACCOUNT_RANKING = gql`
  query GetAccountRanking($where: ranking_bool_exp!) {
    ranking: ranking(where: $where) {
      era
      identity
      activeEras: active_eras
      
      stashAddress: stash_address
      controllerAddress: controller_address
      rewardsAddress: rewards_address
      cmixId: cmix_id
      location    
      selfStake: self_stake
      otherStake: other_stake
      totalStake: total_stake
      nominators
      commission
      sessionKeys: session_keys

      nominations
      eraPointsHistory: era_points_history
    }
  }
`;

export type Nominators = {
  accountId: string;
  stake: string;
  share: string;
}

export type ValidatorAccount = {
  addressId: string;
  location: string;
  cmixId: string;
  nominators: Nominators[];
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
