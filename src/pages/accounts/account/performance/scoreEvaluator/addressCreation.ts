import type { TFunction } from 'i18next';
import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const eraTime = 86400000;
const genesisTime = 1637132496000;

const timestampToEra = (time: number) =>  Math.round((time - genesisTime) / eraTime)

const makeBaseMsg = (t: TFunction, eraNumber: number) => (seniority: string) =>
  t('Stash address was created at era {{eraNumber}} making it a {{seniority}} of the network', { eraNumber, seniority });

const getaAddressCreationScore = ({ account, t }: ScoringContext): [MetricScores, string] => {
  const currentEra = timestampToEra(Date.now());
  const creationEra = timestampToEra(account?.whenCreated ?? 0);
  const eraAge = currentEra - creationEra;
  const baseMsg = makeBaseMsg(t, creationEra);

  if (eraAge >= 365) {
    return ['very good', baseMsg(t('a veteran'))];
  }
  if (180 <= eraAge && eraAge < 365) {
    return ['good', baseMsg(t('a senior'))];
  }
  return ['neutral', baseMsg(t('a junior'))];
};

export default getaAddressCreationScore;
