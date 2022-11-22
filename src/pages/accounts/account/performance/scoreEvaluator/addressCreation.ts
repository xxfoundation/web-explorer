import type { TFunction } from 'i18next';
import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const makeBaseMsg = (t: TFunction) => (eraNumber: number, seniority: string) =>
  t('Stash address was created at era {{eraNumber}} making it a {{seniority}} of the network', { eraNumber, seniority });

const getaAddressCreationScore = ({ account, currentEra, t }: ScoringContext): [MetricScores, string] => {
  const block = account.creationEvent[0]?.block;
  const creationEra = block.era ?? 0;
  const eraAge = currentEra - creationEra;
  const baseMsg = makeBaseMsg(t);

  if (eraAge >= 365) {
    return ['very good', baseMsg(creationEra, t('a veteran'))];
  }
  if (180 <= eraAge && eraAge < 365) {
    return ['good', baseMsg(creationEra, t('a senior'))];
  }
  return ['neutral', baseMsg(creationEra, t('a junior'))];
};

export default getaAddressCreationScore;
