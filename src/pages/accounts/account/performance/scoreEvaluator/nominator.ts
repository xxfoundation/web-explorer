import type { TFunction } from 'i18next';
import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const makeBaseMessage = (t: TFunction, amount: number) => (value: string) =>
  t('Detected {{amount}} nominators, validator is {{value}}', { amount, value });

const getNominatorsScore = ({ nominatorCount: nominators, t }: ScoringContext): [MetricScores, string] => {
  const baseMsg = makeBaseMessage(t, nominators);
  if (nominators < 150) {
    return ['good', baseMsg(t('undersubscribed'))];
  }
  if (nominators < 256) {
    return ['neutral', baseMsg(t('subscribed in a good amount'))];
  }
  return ['bad', baseMsg(t('oversubscribed'))];
};

export default getNominatorsScore;
