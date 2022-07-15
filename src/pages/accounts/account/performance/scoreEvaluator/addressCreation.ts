import { Account } from '../../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../../schemas/staking.schema';
import { MetricScores } from '../../../types';

const baseMessage = (blockNumber: number, seniority: string) =>
  `Stash address was created at block #${blockNumber} making it a ${seniority} of the network`;

const getaAddressCreationScore = (props: {
  account: Account;
  ranking: CommonFieldsRankingFragment;
}): [MetricScores, string] => {
  const validatorTime = props.ranking.activeEras;
  if (validatorTime >= 365) {
    return ['very good', baseMessage(props.account.blockHeight, 'a veteran')];
  }
  if (180 <= validatorTime && validatorTime < 365) {
    return ['good', baseMessage(props.account.blockHeight, 'a senior')];
  }
  return ['neutral', baseMessage(props.account.blockHeight, 'a junior')];
};

export default getaAddressCreationScore;
