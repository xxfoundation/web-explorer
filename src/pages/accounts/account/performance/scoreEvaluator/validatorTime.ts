import type { TFunction } from 'i18next';

import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const makeBaseMessage = (t: TFunction) => (duration: string) =>
  t('Validator has been active in the network for {{duration}} of his lifetime', { duration });

const getValidatorTimeScore = ({
  currentEra,
  stats,
  t
}: ScoringContext): [MetricScores, string] => {
  const baseMsg = makeBaseMessage(t);
  const erasAsValidator = stats.length;
  const firstValidatorEra = Math.min(...stats.map((s) => s.era));
  const validatorPercent = erasAsValidator / (currentEra - firstValidatorEra);
  if (validatorPercent > 0.8) {
    return ['good', baseMsg(t('more than 90%'))];
  }

  if (validatorPercent > 0.75) {
    return ['neutral', baseMsg(t('more than 75%'))];
  }

  return ['bad', baseMsg(t('less that 75%'))];
};

export default getValidatorTimeScore;
