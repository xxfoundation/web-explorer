import { Account } from '../../../../../schemas/accounts.schema';
import { MetricScores } from '../../../types';

const baseMessage = (value: string) => `Validator ${value} information on his identity`;

const getIdentityScore = (account: Account): [MetricScores, string] => {
  const identity = account.identity;
  if (!identity) return ['very bad', baseMessage('did not add any')];

  if (identity.blurb && identity.email && identity.display && identity.judgements?.includes('Known Good')) {
    return ['very good', baseMessage('provides all possible')];
  }
  if (identity.display && identity.email) {
    return ['good', baseMessage('partially provides')];
  }
  if (identity.display) {
    return ['bad', baseMessage('barely provides')];
  }
  
  return ['very bad', baseMessage('did not add any')];
};

export default getIdentityScore;
