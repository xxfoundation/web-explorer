import { AccountType, MetricScores, MetricsType } from '../../../types';
import getaAddressCreationScore from './addressCreation';
import getCommissionScore from './commission';
import getEraPointsScore from './eraPoints';
import getFrequencyOfPayouts from './frequencyOfPayouts';
import getGovernanceScore from './governance';
import getIdentityScore from './identity';
import getNominatorsScore from './nominator';
import getSlashesScore from './slashes';
import getSubaccountsScore from './subaccounts';
import getValidatorTimeScore from './validatorTime';

const validations = (account: AccountType): Record<MetricsType, [MetricScores, string]> => {
  return {
    identity: getIdentityScore(account),
    'address creation': getaAddressCreationScore(account),
    slashes: getSlashesScore(account),
    subaccounts: getSubaccountsScore(account),
    nominators: getNominatorsScore(account),
    'era points': getEraPointsScore(account),
    commission: getCommissionScore(account),
    'frequency of payouts': getFrequencyOfPayouts(account),
    governance: getGovernanceScore(account),
    'validator time': getValidatorTimeScore(account)
  };
};

export default validations;
