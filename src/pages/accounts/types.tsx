import BN from 'bn.js';

export type RolesType =
  | 'council'
  | 'nominators'
  | 'validators'
  | 'technical committe'
  | 'treasuries';

export type AccountType = {
  rank: number;
  transactions: number;
  roles: RolesType[];
  lockedCoin: string | BN;
  balance: string | BN;
  account: string;
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
