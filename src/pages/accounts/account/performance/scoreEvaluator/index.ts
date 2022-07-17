import { Account } from '../../../../../schemas/accounts.schema';
import { ValidatorStats } from '../../../../../schemas/staking.schema';
import { MetricScores, MetricsType } from '../../../types';
import getaAddressCreationScore from './addressCreation';
import getIdentityScore from './identity';
import getSlashesScore from './slashes';

const scoreEvaluator = (props: { account: Account; stats: ValidatorStats }): Partial<Record<MetricsType, [MetricScores, string]>> => {
  return {
    identity: getIdentityScore(props.account),
    'address creation': getaAddressCreationScore(props),
    slashes: getSlashesScore(props),
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
