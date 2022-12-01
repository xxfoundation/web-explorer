import type { TFunction } from 'i18next';
import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const makeBaseMessage = (t: TFunction) => (value: string) => t('Validator {{value}} information on his identity', { value });
const boolBin = (value: unknown) => !!value ? 1 : 0;

const getIdentityScore = ({ account, t }: ScoringContext): [MetricScores, string] => {
  const identity = account.identity;
  const baseMessage = makeBaseMessage(t);

  if (!identity) return ['very bad', baseMessage(t('does not have any'))];

  const contactInfo = boolBin(identity.email) + boolBin(identity.discord) + boolBin(identity.twitter);
  const extraInfo = boolBin(identity.blurb) + boolBin(identity.web);

  if (identity.display && extraInfo > 0 && contactInfo > 2) {
    return ['very good', baseMessage(t('provides contact and extra'))];
  }
  
  if (identity.display && contactInfo > 1) {
    return ['good', baseMessage(t('provides considerable contact'))];
  }

  if (identity.display && contactInfo === 1) {
    return ['neutral', baseMessage(t('provides some contact'))];
  }

  if (identity.display) {
    return ['bad', baseMessage(t('barely provides'))];
  }
  
  return ['very bad', baseMessage(t('did not add any'))];
};

export default getIdentityScore;
