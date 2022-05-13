import { AccountIdentityFields, AccountType, Metrics, MetricsType } from '../../types';

type IdentityFieldsType = keyof AccountIdentityFields;

const identityMetric = (account: AccountType): [Metrics['score'], string] => {
  const baseMessage = (value: string) => `Validator ${value} information on his identity`;
  // Display Name, Legal Name, Email, Web, Twitter, Riot Name, Blurb
  const identityFields: IdentityFieldsType[] = [
    'displayName',
    'legalName',
    'email',
    'website',
    'twitter',
    'riotName',
    'blurb'
  ];
  const result = identityFields.filter((field) => {
    const hasField = Object.keys(account).includes(field);
    return hasField ? !!account[field] : false;
  });
  // TODO check judments
  if (result.length === identityFields.length) {
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

const validations = (account: AccountType): Record<MetricsType, [Metrics['score'], string]> => {
  return { identity: identityMetric(account) };
};

export default validations;
