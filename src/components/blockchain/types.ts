import { PointOptionsObject } from 'highcharts';

export enum BlockStatus {
  Pending = 'pending'
}

export type Block = {
  id: number;
  extrinsic: number;
  events: number;
  status: BlockStatus;
  timestamp: number;
};

export type PercentageValues = {
  team: {
    value: number;
    percentage: number;
  };
  foundation: {
    value: number;
    percentage: number;
  };
};

export type VestingStatePopup = {
  noClick?: boolean;
  hiddenLegend?: boolean;
  stakeable: PercentageValues;
  unstakeable: PercentageValues;
};

export type OthersStatePopup = {
  noClick?: boolean;
  hiddenLegend?: boolean;
  treasury: { value: number; percentage: number };
  canaryNetReward: { value: number; percentage: number };
  liquidityStaking: { value: number; percentage: number };
};

export interface CustomPointOptions<Custom> extends PointOptionsObject {
  custom: Custom;
}
