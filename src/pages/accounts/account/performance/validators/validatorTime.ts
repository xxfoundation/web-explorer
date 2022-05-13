import { AccountType, Metrics } from '../../../types';

const getValidatorTimeScore = ({ firstValidatorEra }: AccountType): [Metrics['score'], string] => {
  const presumedCurrentEra = 1000;

  if (!firstValidatorEra) {
    // TODO error validators must have first validator era
    return ['neutral', 'not a validator'];
  }

  const baseMsg = (duration: string) =>
    `Validator has been active in the network for ${duration} of his lifetime`;

  if (presumedCurrentEra * 0.9 < firstValidatorEra) {
    return ['good', baseMsg('more than 90%')];
  }

  if (presumedCurrentEra * 0.75 < firstValidatorEra) {
    return ['neutral', baseMsg('more than 75%')];
  }

  return ['bad', baseMsg('less that 75%')];
};

export default getValidatorTimeScore;
