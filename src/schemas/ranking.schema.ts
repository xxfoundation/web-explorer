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
  eraPointsHistory: string;
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

export type RankedAccount = {
  addressId: string;
  rank: number;
  name: string;
  location: string;
  cmixId: string;
  nominators: number;
  ownStake: string;
  totalStake: string;
  otherStake: string;
};

export type RankedAccountsQuery = {
  validators: RankedAccount[];
  active: { aggregate: { count: number } };
  waiting: { aggregate: { count: number } };
};

export const GET_RANKED_ACCOUNTS = gql`
  query GetRankedAccounts($limit: Int!, $offset: Int!, $where: ranking_bool_exp) {
    validators: ranking(limit: $limit, offset: $offset, where: $where, distinct_on: [era, rank], order_by:{ era: desc, rank:asc }) {
      rank
      name
      nominators
      location
      cmixId: cmix_id
      ownStake: self_stake
      totalStake: total_stake
      otherStake: other_stake
      addressId: stash_address
    }

    active: ranking_aggregate(where: { active: { _eq: true }},  distinct_on: [era, rank], order_by:{ era: desc, rank:asc }) {
      aggregate {
        count
      }
    }

    waiting: ranking_aggregate(where: {active: {_eq: false}},  distinct_on: [era, rank], order_by:{ era: desc, rank:asc }) {
      aggregate {
        count
      }
    }
  }
`;
