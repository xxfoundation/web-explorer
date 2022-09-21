import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const baseMsg = (number: unknown, value: string) =>
  `Detected ${number} nominators, validator is ${value}`;

const getNominatorsScore = ({ nominatorCount: nominators }: ScoringContext): [MetricScores, string] => {
  if (nominators < 150) {
    return ['good', baseMsg(nominators, 'undersubscribed')];
  }
  if (nominators < 256) {
    return ['neutral', baseMsg(nominators, 'subscribed in a good amount')];
  }
  return ['bad', baseMsg(nominators, 'oversubscribed')];
};

export default getNominatorsScore;
