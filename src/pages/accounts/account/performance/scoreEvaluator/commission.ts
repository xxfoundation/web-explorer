import { AccountType, MetricScores } from '../../../types';

const baseMsg = (value: string) => `Current commission is ${value}`;

const getCommissionScore = ({ averageCommission = 0 }: AccountType): [MetricScores, string] => {
  if (averageCommission >= 30) {
    return ['very bad', baseMsg('much higher than the majority of validators')];
  }
  if (averageCommission >= 18) {
    return ['bad', baseMsg('considerably higher than the average')];
  }

  if (averageCommission >= 10) {
    return ['neutral', baseMsg('in the average')];
  }

  if (averageCommission >= 5) {
    return ['good', baseMsg('lower than the average')];
  }

  return ['very good', baseMsg('much lower than the average')];
};

export default getCommissionScore;
