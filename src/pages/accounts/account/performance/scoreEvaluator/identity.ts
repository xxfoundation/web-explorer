import type { TFunction } from 'i18next';
import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const makeBaseMessage = (t: TFunction) => (value: string) => t('Validator {{value}} information on his identity', { value });

const getIdentityScore = ({ account, t }: ScoringContext): [MetricScores, string] => {
  const identity = account.identity;
  const baseMessage = makeBaseMessage(t);
  if (!identity) return ['very bad', baseMessage(t('did not add any'))];

  if (identity.blurb && identity.email && identity.display && identity.judgements?.includes('Known Good')) {
    return ['very good', baseMessage(t('provides all possible'))];
  }
  if (identity.display && identity.email) {
    return ['good', baseMessage(t('partially provides'))];
  }
  if (identity.display) {
    return ['bad', baseMessage(t('barely provides'))];
  }
  
  return ['very bad', baseMessage(t('did not add any'))];
};

export default getIdentityScore;
