import { AccountType, MetricScores } from '../../../types';

const baseMsg = (number: string) =>
  `Validator’s performance in the network is in the following range: ${number}`;

const presumedNetworkPointAverage = 1000;

const getEraPointsScore = ({ eraPoints = 0 }: AccountType): [MetricScores, string] => {
  if (eraPoints <= presumedNetworkPointAverage * 0.01) {
    return ['very bad', baseMsg('bottom 10%')];
  }
  if (eraPoints <= presumedNetworkPointAverage * 0.03) {
    return ['bad', baseMsg('between 10-30%')];
  }
  if (eraPoints <= presumedNetworkPointAverage * 0.7) {
    return ['neutral', baseMsg('between 30-70%')];
  }
  if (eraPoints <= presumedNetworkPointAverage * 0.9) {
    return ['good', baseMsg('top between 70-90%')];
  }
  return ['very good', baseMsg('top 10%')];
};

export default getEraPointsScore;
