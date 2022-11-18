import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const baseMessage = (eraNumber: number, seniority: string) =>
  `Stash address was created at era #${eraNumber} making it a ${seniority} of the network`;

const getaAddressCreationScore = ({ account }: ScoringContext): [MetricScores, string] => {
  const currentEra = Date.now()
  const creationEra = account?.whenCreated ?? 0;
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
