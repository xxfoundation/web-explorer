import { AccountIdentityFields, AccountType, MetricScores } from '../../../types';

type IdentityFieldsType = keyof AccountIdentityFields;

const identityFields: IdentityFieldsType[] = [
  'displayName',
  'legalName',
  'email',
  'website',
  'twitter',
  'riotName',
  'blurb'
];

const baseMessage = (value: string) => `Validator ${value} information on his identity`;

const getIdentityScore = (account: AccountType): [MetricScores, string] => {
  const result = identityFields.filter((field) => {
    const hasField = Object.keys(account).includes(field);
    return hasField ? !!account[field] : false;
  });
  // TODO check judments
  if (result.length === identityFields.length && account.judgement === 'Known Good') {
    return ['very good', baseMessage('provides all possible')];
  }
  if (account.displayName && account.email) {
    return ['good', baseMessage('partially provides')];
  }
  if (account.displayName) {
    return ['bad', baseMessage('barely provides')];
  }
  if (!result || !result.length) {
    return ['very bad', baseMessage('did not add any')];
  }
  return ['very good', 'sdfsd'];
};

export default getIdentityScore;
