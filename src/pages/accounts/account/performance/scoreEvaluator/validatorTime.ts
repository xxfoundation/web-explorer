import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const baseMsg = (duration: string) =>
  `Validator has been active in the network for ${duration} of his lifetime`;

const getValidatorTimeScore = ({
  currentEra,
  stats
}: ScoringContext): [MetricScores, string] => {
  const erasAsValidator = stats.length;
  const firstValidatorEra = Math.min(...stats.map((s) => s.era));
  const validatorPercent = erasAsValidator / (currentEra - firstValidatorEra);
  if (validatorPercent > 0.8) {
    return ['good', baseMsg('more than 90%')];
  }

  if (validatorPercent > 0.75) {
    return ['neutral', baseMsg('more than 75%')];
  }

  return ['bad', baseMsg('less that 75%')];
};

export default getValidatorTimeScore;
