import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const getSlashesScore = ({ currentEra, slashes }: ScoringContext): [MetricScores, string] => {
  const totalSlashes = slashes.length;
  const recentSlashes = slashes.filter((s) => currentEra - s.era > 28).length;
  if (recentSlashes >= 1 || totalSlashes > 1) {
    return ['very bad', 'Slashed more than once OR at least once in the last 28 eras.'];
  }

  if (totalSlashes > 0) {
    return ['bad', 'Slashed only once'];
  }

  return ['good', 'Never slashed'];
};

export default getSlashesScore;
