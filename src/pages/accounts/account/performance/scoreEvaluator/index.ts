import type { ScoringContext } from './types';

import { MetricScores, MetricsType } from '../../../types';
import getaAddressCreationScore from './addressCreation';
import getIdentityScore from './identity';
import getSlashesScore from './slashes';
import getSubaccountsScore from './subaccounts';
import getNominatorsScore from './nominator';
import getCommissionScore from './commission';
import getFrequencyOfPayouts from './frequencyOfPayouts';
import getValidatorTimeScore from './validatorTime';

const evaluateScore = (ctx: ScoringContext): Partial<Record<MetricsType, [MetricScores, string]>> => {
  return {
    identity: getIdentityScore(ctx.account),
    'address creation': getaAddressCreationScore(ctx),
    slashes: getSlashesScore(ctx),
    subaccounts: getSubaccountsScore(ctx),
    nominators: getNominatorsScore(ctx),
    // 'era points': getEraPointsScore(ctx),
    commission: getCommissionScore(ctx),
    'frequency of payouts': getFrequencyOfPayouts(ctx),
    // governance: getGovernanceScore(ctx),
    'validator time': getValidatorTimeScore(ctx)
  };
};

export default evaluateScore;
