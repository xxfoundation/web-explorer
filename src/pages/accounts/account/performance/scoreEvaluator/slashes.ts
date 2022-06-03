import { Account } from '../../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../../schemas/ranking.schema';
import { MetricScores } from '../../../types';

const getSlashesScore = ({}: {
  account: Account;
  ranking: CommonFieldsRankingFragment;
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
