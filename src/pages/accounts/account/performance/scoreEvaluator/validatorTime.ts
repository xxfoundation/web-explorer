import { MetricScores } from '../../../types';

const baseMsg = (duration: string) =>
  `Validator has been active in the network for ${duration} of his lifetime`;

const presumedCurrentEra = 1000;

const getValidatorTimeScore = ({
  firstValidatorEra
}: {
  firstValidatorEra: number;
}): [MetricScores, string] => {
  if (!firstValidatorEra) {
    // TODO error validators must have first validator era
    return ['neutral', 'not a validator'];
  }

  if (presumedCurrentEra * 0.9 < firstValidatorEra) {
    return ['good', baseMsg('more than 90%')];
  }

  if (presumedCurrentEra * 0.75 < firstValidatorEra) {
    return ['neutral', baseMsg('more than 75%')];
  }

  return ['bad', baseMsg('less that 75%')];
};

export default getValidatorTimeScore;
