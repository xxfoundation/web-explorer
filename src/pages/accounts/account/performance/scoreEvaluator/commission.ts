import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const baseMsg = (value: number, message: string) => `Average commission is ${value}%, ${message}`;

const getCommissionScore = ({
  commission
}: ScoringContext): [MetricScores, string] => {

  if (commission >= 30) {
    return ['very bad', baseMsg(commission, 'much higher than the majority of validators')];
  }
  
  if (commission > 18) {
    return ['bad', baseMsg(commission, 'considerably higher than the average')];
  }

  if (commission >= 10) {
    return ['neutral', baseMsg(commission, 'in the average')];
  }

  if (commission >= 5) {
    return ['good', baseMsg(commission, 'lower than the average')];
  }

  return ['very good', baseMsg(commission, 'much lower than the average')];
};

export default getCommissionScore;
