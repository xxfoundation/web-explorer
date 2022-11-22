import type { ScoringContext } from './types';
import type { MetricScores } from '../../../types';
import { applyFormat } from '../../../../../components/FormatBalance/formatter';
import { TFunction } from 'i18next';

const makeBaseMsg = (t: TFunction, amount: number) => (score: string) =>
  t('{{score}}, validator has {{amount}} of unclaimed era rewards', {
    amount: applyFormat(amount.toString()),
    score
  });


const getFrequencyOfPayouts = ({
  rewardFrequency = 0,
  t,
  unclaimedRewards = 0,
}: ScoringContext): [MetricScores, string] => {
  const baseMsg = makeBaseMsg(t, unclaimedRewards);
  if (!rewardFrequency) {
    return ['neutral', t('validator never received a reward')];
  }

  if (rewardFrequency >= 1 && rewardFrequency < 7) {
    return ['very good', baseMsg(t('Very Good'))];
  }
  if (rewardFrequency >= 7 && rewardFrequency < 30) {
    return ['good', baseMsg(t('Good'))];
  }
  if (rewardFrequency >= 30 && rewardFrequency < 60) {
    return ['bad', baseMsg(t('Bad'))];
  }

  return ['very bad', baseMsg(t('Very Bad'))];
};

export default getFrequencyOfPayouts;
