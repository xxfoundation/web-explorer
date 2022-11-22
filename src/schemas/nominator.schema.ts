import { gql } from '@apollo/client';

const NOMINATOR_INFO_FRAGMENT = gql`
  fragment nominatorInfoFragment on nominator {
    stashAddress: stash_address
    rewardsAddress: rewards_address
    account {
      identity {
        display
      }
    }
    stake
    targets
    timestamp
  }
`;


export type NominatorInfo = {
  stashAddress: string;
  rewardsAddress: string;
  account: {
    identity: null | {
      display: string;
    }
  }
  stake: string;
  targets: string[];
  timestamp: string;
};

export type GetNominatorInfo = {
  nominator: NominatorInfo[];
}

export const GET_NOMINATOR_INFO = gql`
  ${NOMINATOR_INFO_FRAGMENT}
  query GetNominatorInfo($accountId: String!) {
    nominator(where: { stash_address: { _eq: $accountId }}) {
      ...nominatorInfoFragment
    }
  }
`