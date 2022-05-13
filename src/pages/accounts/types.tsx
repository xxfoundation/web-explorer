import BN from 'bn.js';
import { ReactNode } from 'react';

export type Roles = 'council' | 'validator' | 'nominator' | 'technical committe' | 'treasurie';

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

export type AccountIdentityFields = {
  displayName?: string;
  legalName?: string;
  email?: string;
  website?: string;
  twitter?: string;
  riotName?: string;
  blurb?: string;
};

export type AccountType = {
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
} & AccountIdentityFields;

export type MetricsType = 'identity';

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
