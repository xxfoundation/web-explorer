import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const eraTime = 86400000;
const genesisTime = 1637132496000;

const timestampToEra = (time: number) =>  Math.round((time - genesisTime) / eraTime)

const baseMessage = (eraNumber: number, seniority: string) =>
  `Stash address was created at era #${eraNumber} making it ${seniority} of the network`;

const getaAddressCreationScore = ({ account }: ScoringContext): [MetricScores, string] => {
  const currentEra = timestampToEra(Date.now());
  const creationEra = timestampToEra(account?.whenCreated ?? 0);
  const eraAge = currentEra - creationEra;
  
  if (eraAge >= 365) {
    return ['very good', baseMessage(creationEra, 'a veteran')];
  }
  if (180 <= eraAge && eraAge < 365) {
    return ['good', baseMessage(creationEra, 'a senior')];
  }
  return ['neutral', baseMessage(creationEra, 'a junior')];
};

export default getaAddressCreationScore;
