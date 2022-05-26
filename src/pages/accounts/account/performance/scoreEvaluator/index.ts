import { Account } from '../../../../../schemas/accounts.schema';
import { MetricScores, MetricsType } from '../../../types';
import getIdentityScore from './identity';

const scoreEvaluator = (account: Account): Partial<Record<MetricsType, [MetricScores, string]>> => {
  return {
    identity: getIdentityScore(account)
    // 'address creation': getaAddressCreationScore(account),
    // slashes: getSlashesScore(account),
    // subaccounts: getSubaccountsScore(account),
    // nominators: getNominatorsScore(account),
    // 'era points': getEraPointsScore(account),
    // commission: getCommissionScore(account),
    // 'frequency of payouts': getFrequencyOfPayouts(account),
    // // governance: getGovernanceScore(account),
    // 'validator time': getValidatorTimeScore(account)
  };
};

export default scoreEvaluator;
