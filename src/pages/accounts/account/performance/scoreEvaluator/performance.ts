import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const baseMsg = (number: string) =>
  `Validator’s performance in the network is in the following range: ${number}`;

const getPerformanceScore = ({ networkEraPoints }: ScoringContext): [MetricScores, string] => {
  if (!networkEraPoints.stats) {
    return ['very bad', baseMsg('no data in past 7 eras')];
  }
  const avgPerformance = networkEraPoints.stats.aggregate.avg.relativePerformance

  if (avgPerformance <= 0.10) {
    return ['very bad', baseMsg('low 10%')];
  }
  if (avgPerformance <= 0.30) {
    return ['bad', baseMsg('10-30%')];
  }
  if (avgPerformance <= 0.70) {
    return ['neutral', baseMsg('30-70%')];
  }
  if (avgPerformance <= 0.90) {
    return ['good', baseMsg('70-90%')];
  }
  return ['very good', baseMsg('top 10%')];
};

export default getPerformanceScore;
