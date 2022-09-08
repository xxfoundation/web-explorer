import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const baseMsg = (value: string) => `Average commission is ${value}`;

const getCommissionScore = ({
  avgCommission
}: ScoringContext): [MetricScores, string] => {
  if (avgCommission >= 30) {
    return ['very bad', baseMsg('much higher than the majority of validators')];
  }
  
  if (avgCommission >= 18) {
    return ['bad', baseMsg('considerably higher than the average')];
  }

  if (avgCommission >= 10) {
    return ['neutral', baseMsg('in the average')];
  }

  if (avgCommission >= 5) {
    return ['good', baseMsg('lower than the average')];
  }

  return ['very good', baseMsg('much lower than the average')];
};

export default getCommissionScore;
