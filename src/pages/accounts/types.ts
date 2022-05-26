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

export type Identity = {
  display?: string;
  displayParent?: string;
  email?: string;
  judgements?: Judgements[];
  legal?: string;
  other?: unknown;
  parent?: string;
  twitter?: string;
  web?: string;
  blurb?: string;

  // FIXME madeup field
  riotName?: string;
};

type Judgements =
  | 'Unknown'
  | 'Reasonable'
  | 'Known Good'
  | 'Out of Date'
  | 'Low Quality'
  | 'Erroneous';

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
