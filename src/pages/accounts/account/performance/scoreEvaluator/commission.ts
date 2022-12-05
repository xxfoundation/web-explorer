import type { TFunction } from 'i18next';
import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const makeBaseMsg = (t: TFunction) => (value: string) => t('Average commission is {{value}}', { value });

const getCommissionScore = ({
  commission,
  t
}: ScoringContext): [MetricScores, string] => {
  const baseMsg = makeBaseMsg(t);
  if (commission >= 30) {
    return ['very bad', baseMsg(t('much higher than the majority of validators'))];
  }
  
  if (commission >= 18) {
    return ['bad', baseMsg(t('considerably higher than the average'))];
  }

  if (commission >= 10) {
    return ['neutral', baseMsg(t('in the average'))];
  }

  if (commission >= 5) {
    return ['good', baseMsg(t('lower than the average'))];
  }

  return ['very good', baseMsg(t('much lower than the average'))];
};

export default getCommissionScore;
