import { gql } from '@apollo/client';

export type CommonFieldsRankingFragment = {
  slashed: boolean;
  stashAddress: string;
  stashAddressCreationBlock: number;
  controllerAddress: string;
  activeRating: number;
  addressCreationRating: number;
  commissionRating: number;
  eraPointsRating: number;
  governanceRating: number;
  identityRating: number;
  nominatorsRating: number;
  payoutRating: number;
  slashRating: number;
  subAccountsRating: number;
  totalRating: number;

  selfStake: number;
  otherStake: number;
  totalStake: number;
  nominators: number;
  commission: string;
};

export const COMMON_FIELDS_RANKING_FRAGMENT = gql`
  fragment ranking on ranking {
    slashed
    stashAddress: stash_address
    stashAddressCreationBlock: stash_address_creation_block
    controllerAddress: controller_address
    activeRating: active_rating
    addressCreationRating: address_creation_rating
    commissionRating: commission_rating
    eraPointsRating: era_points_rating
    governanceRating: governance_rating
    identityRating: identity_rating
    nominatorsRating: nominators_rating
    payoutRating: payout_rating
    slashRating: slash_rating
    subAccountsRating: sub_accounts_rating
    totalRating: total_rating

    selfStake: self_stake
    otherStake: other_stake
    totalStake: total_stake
    nominators
    commission
  }
`;

export const GET_ACCOUNT_RANKING = gql`
  ${COMMON_FIELDS_RANKING_FRAGMENT}
  query GetAccountRanking($blockHeight: bigint!, $stashAddress: String!) {
    ranking: ranking_by_pk(block_height: $blockHeight, stash_address: $stashAddress) {
      ...ranking
    }
  }
`;
