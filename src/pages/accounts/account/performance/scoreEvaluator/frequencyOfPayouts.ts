import type { ScoringContext } from './types';
import type { MetricScores } from '../../../types';

const getFrequencyOfPayouts = ({
  rewardFrequency = 0,
  unclaimedRewards = 0
}: ScoringContext): [MetricScores, string] => {
  if (!rewardFrequency) {
    return ['neutral', 'validator never received a reward'];
  }

  const baseMsg = (score: string) =>
    `${score}, validator has ${unclaimedRewards} unclaimed era rewards`;

  if (rewardFrequency >= 1 && rewardFrequency < 7) {
    return ['very good', baseMsg('Very Good')];
  }
  if (rewardFrequency >= 7 && rewardFrequency < 30) {
    return ['good', baseMsg('Good')];
  }
  if (rewardFrequency >= 30 && rewardFrequency < 60) {
    return ['bad', baseMsg('Bad')];
  }

  return ['very bad', baseMsg('Very Bad')];
};

export default getFrequencyOfPayouts;
