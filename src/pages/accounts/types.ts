
import type { Account } from '../../schemas/accounts.schema';
import { Slash } from '../../schemas/slashes.schema';
import type { ReactNode } from 'react';

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

export type Performance = 'Very Good' | 'Good' | 'Neutral' | 'Bad' | 'Very Bad';

export type ScoringContext = {
  currentEra: number;
  account: Account;
  slashes: Slash[];
}

export type ScoringArray = [Performance, (ctx: ScoringContext) => boolean][];
type DescriptionMap = Partial<Record<Performance, string>>;

export type PerformanceData = {
  label: string;
  scoring: ScoringArray;
  descriptionTemplate?: string;
  descriptions: DescriptionMap;
  tooltip: React.ReactNode;
}