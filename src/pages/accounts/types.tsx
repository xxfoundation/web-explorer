import BN from 'bn.js';
import { ReactNode } from 'react';

export type BalanceType = {
  accountId: string;
  accountNonce?: string;
  additional?: [];
  freeBalance?: string;
  frozenFee?: string;
  frozenMisc?: string;
  reservedBalance?: string;
  votingBalance?: string;
  availableBalance?: string;
  lockedBalance?: string;
  lockedBreakdown?: {
    id: string;
    amount: number;
    reasons: string | 'Misc' | 'All';
  }[];
  vestingLocked?: string;
  isVesting?: boolean;
  vestedBalance?: string;
  vestedClaimable?: string;
  vesting?: {
    endBlock: string;
    locked: string;
    perBlock: string;
    startingBlock: string;
    vested: string;
  }[];
  vestingTotal?: string;
  namedReserves: [][];
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
