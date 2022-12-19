import { Account } from '../../../../../schemas/accounts.schema';
import { MetricScores } from '../../../types';

const baseMessage = (value: string) => `Validator ${value} information on his identity`;
const boolBin = (value: boolean) => value ? 1 : 0;

const getIdentityScore = (account: Account): [MetricScores, string] => {
  const identity = account.identity;
  if (!identity) return ['very bad', baseMessage('does not have any')];

  const contactInfo = boolBin(!!identity.email) + boolBin(!!identity.discord) + boolBin(!!identity.twitter)
  const extraInfo = boolBin(!!identity.blurb) + boolBin(!!identity.web)

  if (identity.display && extraInfo > 0 && contactInfo > 2) {
    return ['very good', baseMessage('provides contact and extra')];
  }
  if (identity.display && contactInfo > 1) {
    return ['good', baseMessage('provides considerable contact')];
  }
  if (identity.display && contactInfo === 1) {
    return ['neutral', baseMessage('provides some contact')];
  }
  if (identity.display) {
    return ['bad', baseMessage('barely provides')];
  }
  
  return ['very bad', baseMessage('did not add any')];
};

export default getIdentityScore;
