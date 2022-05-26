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
};

export const COMMON_FIELDS_RANKING_FRAGMENT = gql`
  fragment ranking on blockchain_ranking {
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
  }
`;
