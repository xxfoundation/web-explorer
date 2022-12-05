import { applyFormat } from '../../../../../components/FormatBalance/formatter';
import { TFunction } from 'i18next';
import type { ScoringContext } from './types';
import type { MetricScores } from '../../../types';

const makeBaseMsg = (t: TFunction, amount: number) => (score: string) =>
  t('{{score}}, validator has {{amount}} eras unclaimed', {
    amount: applyFormat(amount.toString()),
    score
  });

  
const getFrequencyOfPayouts = ({
  payoutClaimedEras = 0,
  payoutTotalEras = 0,
  t
}: ScoringContext): [MetricScores, string] => {
  // Remove current era from total eras to be claimed
  const unclaimedEras = Math.abs((payoutTotalEras - 1) - payoutClaimedEras);
  const baseMsg = makeBaseMsg(t, unclaimedEras)

  if (unclaimedEras < 7) {
    return ['very good', baseMsg('Very Good')];
  }
  if (unclaimedEras >= 7 && unclaimedEras < 30) {
    return ['good', baseMsg('Good')];
  }
  if (unclaimedEras >= 30 && unclaimedEras < 60) {
    return ['bad', baseMsg('Bad')];
  }

  return ['very bad', baseMsg(t('Very Bad'))];
};

export default getFrequencyOfPayouts;
