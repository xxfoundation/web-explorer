import type { ScoringContext } from './types';
import type { MetricScores } from '../../../types';

const getFrequencyOfPayouts = ({
  payoutClaimedEras = 0,
  payoutTotalEras = 0
}: ScoringContext): [MetricScores, string] => {
  if (!payoutClaimedEras) {
    return ['neutral', 'validator never received a reward'];
  }
  // Remove current era from total eras to be claimed
  const unclaimedEras = Math.abs((payoutTotalEras - 1) - payoutClaimedEras);

  const baseMsg = (score: string) =>
    `${score}, validator has ${unclaimedEras} ${unclaimedEras ? 'eras' : 'era'} unclaimed.`;

  if (unclaimedEras < 7) {
    return ['very good', baseMsg('Very Good')];
  }
  if (unclaimedEras >= 7 && unclaimedEras < 30) {
    return ['good', baseMsg('Good')];
  }
  if (unclaimedEras >= 30 && unclaimedEras < 60) {
    return ['bad', baseMsg('Bad')];
  }

  return ['very bad', baseMsg('Very Bad')];
};

export default getFrequencyOfPayouts;
