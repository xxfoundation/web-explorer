import { ReactNode } from 'react';

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
