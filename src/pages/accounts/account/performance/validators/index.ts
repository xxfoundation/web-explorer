import { AccountType, Metrics, MetricsType } from '../../../types';
import getaAddressCreationScore from './addressCreation';
import getIdentityScore from './identity';
import getSlashesScore from './slashesScore';
import getSubaccountsScore from './subaccounts';
import getValidatorTimeScore from './validatorTime';

const getNominatorsScore = (): [Metrics['score'], string] => {
  const baseMsg = (number: unknown, value: string) =>
    `Detected ${number} nominators, validator is ${value}`;
  return ['neutral', baseMsg('unknwon', 'unknwon')];
};

const getEraPointsScore = (): [Metrics['score'], string] => {
  const baseMsg = (number: string) =>
    `Validator’s performance in the network is in the following range: ${number}`;
  return ['neutral', baseMsg('unknwon')];
};

const getCommissionScore = (): [Metrics['score'], string] => {
  const baseMsg = (value: string) => `Current commission is ${value}`;
  return ['neutral', baseMsg('unknwon')];
};

const getFrequencyOfPayouts = (): [Metrics['score'], string] => {
  const baseMsg = (score: Metrics['score'], number: number) =>
    `${score}, validator has ${number} unclaimed era rewards`;
  return ['neutral', baseMsg('neutral', 0)];
};

const getGovernanceScore = (): [Metrics['score'], string] => {
  const baseMsg = (value: unknown) => `The validator ${value}`;
  return ['neutral', baseMsg('has participated a unknown number of time in governance')];
};

const validations = (account: AccountType): Record<MetricsType, [Metrics['score'], string]> => {
  return {
    identity: getIdentityScore(account),
    'address creation': getaAddressCreationScore(account),
    slashes: getSlashesScore(account),
    subaccounts: getSubaccountsScore(account),
    nominators: getNominatorsScore(),
    'era points': getEraPointsScore(),
    commission: getCommissionScore(),
    'frequency of payouts': getFrequencyOfPayouts(),
    governance: getGovernanceScore(),
    'validator time': getValidatorTimeScore(account)
  };
};

export default validations;
