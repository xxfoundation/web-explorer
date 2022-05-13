import { AccountType, Metrics } from '../../../types';

const getSlashesScore = ({
  holderSlashes = 0,
  latestSlashes = 0
}: AccountType): [Metrics['score'], string] => {
  if (latestSlashes > 0 || holderSlashes > 1) {
    return ['very bad', 'Slashes more than once'];
  }
  if (latestSlashes + holderSlashes > 0) {
    return ['bad', 'Slashes only once'];
  }
  return ['good', 'No slashes detected'];
};

export default getSlashesScore;
