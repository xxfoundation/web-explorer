import { Account } from '../../../../../schemas/accounts.schema';
import { GetRankingByAccountId } from '../../../../../schemas/ranking.schema';
import { MetricScores, MetricsType } from '../../../types';
import getIdentityScore from './identity';

const validations = (
  account: Account,
  ranking: GetRankingByAccountId['ranking']
): Partial<Record<MetricsType, [MetricScores, string]>> => {
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

export default validations;
