import BN from 'bn.js';

export type Roles = 'council' | 'validator' | 'nominator' | 'tech committee';

export type HoldersRoles =
  | 'council'
  | 'validator'
  | 'nominator'
  | 'technical committe'
  | 'treasuries';

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

export type AccountType = {
  roles: Roles[];
  id: string;
  address: string;
  publicKey: string;
  name?: string;
  legalName?: string;
  personalIntroduction?: string;
  stash: string;
  controller: string;
  email?: string;
  twitter?: string;
  riotID?: string;
  website?: string;
  balance: BalanceType;
  reserved: LockedBalanceType;
  locked: LockedBalanceType;
};

export type MetricScores = 'very good' | 'good' | 'neutral' | 'bad' | 'very bad';

export type Metrics = {
  name: string;
  score?: MetricScores;
  description?: string;
};

export type MetricScorePopupProps = {
  veryGood?: string;
  good: string;
  neutral: string;
  bad: string;
  veryBad?: string;
};

export type MetricPopupProps = {
  name: string;
  description: string;
  scores: MetricScorePopupProps;
};
