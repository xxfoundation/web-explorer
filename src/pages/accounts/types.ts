import { ReactNode } from 'react';

export type MetricsType =
  | 'identity'
  | 'address creation'
  | 'slashes'
  | 'subaccounts'
  | 'validator time'
  | 'nominators'
  | 'performance'
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

export type ScoreDescriptions =  Partial<Record<MetricScores, string>>;

export type MetricPopupProps = {
  name: string;
  description: ReactNode;
  scores: ScoreDescriptions;
};
