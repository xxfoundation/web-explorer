import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const getSubaccountsScore = ({
  // childCount = 0,
  // parentCount = 0
}: ScoringContext): [MetricScores, string] => {
  // const count = parentCount + childCount;

  // return (count > 0)
  //   ? [
  //     'good',
  //     `Detected sub-identity, the validator is part of a cluster of ${count} validators`
  //   ]
  return ['neutral', 'No sub-identity detected'];
};

export default getSubaccountsScore;
