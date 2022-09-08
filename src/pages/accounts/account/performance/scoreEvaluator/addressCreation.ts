import type { MetricScores } from '../../../types';
import type { ScoringContext } from './types';

const baseMessage = (blockNumber: number, seniority: string) =>
  `Stash address was created at block #${blockNumber} making it a ${seniority} of the network`;

const getaAddressCreationScore = ({ account, currentEra }: ScoringContext): [MetricScores, string] => {
  const block = account.whenCreatedEra;
  const eraAge = currentEra - block;

  if (eraAge >= 365) {
    return ['very good', baseMessage(block, 'a veteran')];
  }
  if (180 <= eraAge && eraAge < 365) {
    return ['good', baseMessage(block, 'a senior')];
  }
  return ['neutral', baseMessage(block, 'a junior')];
};

export default getaAddressCreationScore;
