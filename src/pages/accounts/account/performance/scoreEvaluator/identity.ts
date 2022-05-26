import { Account } from '../../../../../schemas/accounts.schema';
import { Identity, MetricScores } from '../../../types';

type IdentityFieldsType = keyof Identity;

const identityFields: IdentityFieldsType[] = [
  'display',
  'displayParent',
  'email',
  'judgements',
  'legal',
  'other',
  'parent',
  'twitter',
  'web',
  'blurb',
  'riotName'
];

const baseMessage = (value: string) => `Validator ${value} information on his identity`;

const getIdentityScore = (account: Account): [MetricScores, string] => {
  const identity: Identity = JSON.parse(account.identity);
  const result = identityFields.filter((field) => {
    const hasField = Object.keys(account).includes(field);
    return hasField ? !!identity[field] : false;
  });
  // TODO check judments
  if (result.length === identityFields.length && identity.judgements?.includes('Known Good')) {
    return ['very good', baseMessage('provides all possible')];
  }
  if (identity.display && identity.email) {
    return ['good', baseMessage('partially provides')];
  }
  if (identity.display) {
    return ['bad', baseMessage('barely provides')];
  }
  if (!result || !result.length) {
    return ['very bad', baseMessage('did not add any')];
  }
  return ['very good', 'sdfsd'];
};

export default getIdentityScore;
