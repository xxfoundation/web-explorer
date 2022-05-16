import BN from 'bn.js';
import { ReactNode } from 'react';

// export type Roles = 'council' | 'validator' | 'nominator' | 'technical committe' | 'treasurie';
export type Roles = 'validator' | 'nominator' | 'council' | 'technical committee' | 'treasury';

export type BalanceType = {
  transferable: string | BN;
};

export type LockedBalanceType = {
  bonded: string | BN;
  unbonding: string | BN;
  democracy: string | BN;
  election: string | BN;
  vesting: string | BN;
};

type Judgements =
  | 'Unknown'
  | 'Reasonable'
  | 'Known Good'
  | 'Out of Date'
  | 'Low Quality'
  | 'Erroneous';

export type AccountIdentityFields = {
  displayName?: string;
  legalName?: string;
  email?: string;
  website?: string;
  twitter?: string;
  riotName?: string;
  blurb?: string;
  judgement?: Judgements;
  parentIdentity?: string[];
  childrenIdentity?: string[];
};

export type AccountType = AccountIdentityFields & {
  id: string;
  address: string;
  publicKey: string;
  stash: string;
  controller: string;
  roles: Roles[];

  rank: number;
  transactions: number;
  lockedCoin: string | BN;

  balance: BalanceType;
  reserved: LockedBalanceType;
  locked: LockedBalanceType;

  era: number;

  // validator fields?
  firstValidatorEra?: number;
  latestSlashes?: number;
  holderSlashes?: number;

  nominators?: number;

  eraPoints?: number;

  averageCommission?: number;

  frequencyOfRewards?: number;
  unclaimedRewards?: number;

  democracy?: {
    latestNumberOfVotes: number;
    proposalVotePerMonth: number;
    proposalVoteForCouncil: number;
    missedProposals: number;
    councilMember: boolean;
  };
};

export type MetricsType =
  | 'identity'
  | 'address creation'
  | 'slashes'
  | 'subaccounts'
  | 'nominators'
  | 'era points'
  | 'commission'
  | 'frequency of payouts'
  | 'governance'
  | 'validator time';

export type MetricScores = 'very good' | 'good' | 'neutral' | 'bad' | 'very bad';

export type Metrics = {
  name: string;
  score?: MetricScores;
  description?: string;
};

export type MetricScorePopupProps = {
  veryGood?: ReactNode;
  good?: ReactNode;
  neutral?: ReactNode;
  bad?: ReactNode;
  veryBad?: ReactNode;
};

export type MetricPopupProps = {
  name: string;
  description: ReactNode;
  scores: MetricScorePopupProps;
};
