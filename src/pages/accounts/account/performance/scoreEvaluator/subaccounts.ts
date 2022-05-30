import { MetricScores } from '../../../types';

const getSubaccountsScore = ({
  parentIdentity = [],
  childrenIdentity = []
}: {
  parentIdentity: [];
  childrenIdentity: [];
}): [MetricScores, string] => {
  if (parentIdentity.length || childrenIdentity.length) {
    return [
      'good',
      `Detected sub-identity, the validator is part of a cluster of ${
        parentIdentity.length + childrenIdentity.length
      } validators`
    ];
  }
  return ['neutral', 'No sub-identity detected'];
};

export default getSubaccountsScore;
