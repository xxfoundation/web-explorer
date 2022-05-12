import BN from 'bn.js';

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

export type AccountType = {
  rank: number;
  transactions: number;
  lockedCoin: string | BN;
  account: string;
  roles: Roles[];
  // roles: Roles[];
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

export type MetricScoreProps = {
  veryGood?: string;
  good: string;
  neutral: string;
  bad: string;
  veryBad?: string;
};

export type MetricProps = {
  title: string;
  description: string;
  scores: MetricScoreProps;
};
