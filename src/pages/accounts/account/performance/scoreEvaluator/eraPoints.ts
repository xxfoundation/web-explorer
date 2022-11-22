import { TFunction } from 'i18next';
import { MetricScores } from '../../../types';

const makeBaseMsg = (t: TFunction) => (range: string) =>
  t('Validator\'s performance in the network is in the following range: {{range}}', { range });

const presumedNetworkPointAverage = 1000;

const getEraPointsScore = ({ eraPoints = 0, t }: { eraPoints: number, t: TFunction }): [MetricScores, string] => {
  const baseMsg = makeBaseMsg(t);
  if (eraPoints <= presumedNetworkPointAverage * 0.01) {
    return ['very bad', baseMsg(t('bottom 10%'))];
  }

  if (eraPoints <= presumedNetworkPointAverage * 0.03) {
    return ['bad', baseMsg(t('between 10-30%'))];
  }

  if (eraPoints <= presumedNetworkPointAverage * 0.7) {
    return ['neutral', baseMsg(t('between 30-70%'))];
  }

  if (eraPoints <= presumedNetworkPointAverage * 0.9) {
    return ['good', baseMsg(t('top between 70-90%'))];
  }
  
  return ['very good', baseMsg(t('top 10%'))];
};

export default getEraPointsScore;
