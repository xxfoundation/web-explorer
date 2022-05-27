import { Account } from '../../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../../schemas/ranking.schema';
import { MetricScores } from '../../../types';

const baseMessage = (blockNumber: unknown, seniority: string) =>
  `Stash address was created at block #${blockNumber} making it a ${seniority} of the network`;

const presumedCurrentEra = 1000;

const getaAddressCreationScore = (props: {
  account: Account;
  ranking: CommonFieldsRankingFragment;
}): [MetricScores, string] => {
  // fetch latest block to check blocknumber number and era
  // const eraDifference = presumedCurrentEra - account.era;
  const eraDifference = presumedCurrentEra - props.ranking.eraPointsRating;
  if (eraDifference >= 365) {
    return ['very good', baseMessage('"unknown"', 'a veteran')];
  }
  if (180 <= eraDifference && eraDifference < 365) {
    return ['good', baseMessage('"unknown"', 'a senior')];
  }
  return ['neutral', baseMessage('"unknown"', 'a junior')];
};

export default getaAddressCreationScore;
