import { Account } from '../../../../../schemas/accounts.schema';
import { ValidatorStats } from '../../../../../schemas/staking.schema';
import { MetricScores } from '../../../types';

const getSlashesScore = ({ }: {
  account: Account;
  stats: ValidatorStats;
}): [MetricScores, string] => {
  // if (latestSlashes > 0 || holderSlashes > 1) {
  //   return ['very bad', 'Slashes more than once'];
  // }
  // if (latestSlashes + holderSlashes > 0) {
  //   return ['bad', 'Slashes only once'];
  // }
  // return ['good', 'No slashes detected'];
  return ['good', 'No slashes detected'];
};

export default getSlashesScore;
