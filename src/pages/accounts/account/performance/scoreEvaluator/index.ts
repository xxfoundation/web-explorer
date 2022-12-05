import type { ScoringContext } from './types';

import { MetricScores, MetricsType } from '../../../types';
import getaAddressCreationScore from './addressCreation';
import getIdentityScore from './identity';
import getSlashesScore from './slashes';
import getNominatorsScore from './nominator';
import getCommissionScore from './commission';
import getFrequencyOfPayouts from './frequencyOfPayouts';
import getValidatorTimeScore from './validatorTime';
import getPerformanceScore from './performance';

const evaluateScore = (ctx: ScoringContext): Partial<Record<MetricsType, [MetricScores, string]>> => {
  return {
    identity: getIdentityScore(ctx),
    'address creation': getaAddressCreationScore(ctx),
    slashes: getSlashesScore(ctx),
    nominators: getNominatorsScore(ctx),
    commission: getCommissionScore(ctx),
    'frequency of payouts': getFrequencyOfPayouts(ctx),
    'validator time': getValidatorTimeScore(ctx),
    'performance': getPerformanceScore(ctx),
  };
};

export default evaluateScore;
