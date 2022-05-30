import { MetricScores } from '../../../types';

const getFrequencyOfPayouts = ({
  frequencyOfRewards = 0,
  unclaimedRewards = 0
}: {
  frequencyOfRewards: number;
  unclaimedRewards: number;
}): [MetricScores, string] => {
  // TODO has a maxium of eras to consider
  if (!frequencyOfRewards) {
    return ['neutral', 'validator never received a reward'];
  }

  const baseMsg = (score: string) =>
    `${score}, validator has ${unclaimedRewards} unclaimed era rewards`;

  if (frequencyOfRewards >= 1 && frequencyOfRewards < 7) {
    return ['very good', baseMsg('Very Good')];
  }
  if (frequencyOfRewards >= 7 && frequencyOfRewards < 30) {
    return ['good', baseMsg('Good')];
  }
  if (frequencyOfRewards >= 30 && frequencyOfRewards < 60) {
    return ['bad', baseMsg('Bad')];
  }
  return ['very bad', baseMsg('Very Bad')];
};

export default getFrequencyOfPayouts;
