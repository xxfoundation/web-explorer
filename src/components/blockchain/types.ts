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

export type CustomData = {
  id: string;
  name: string;
  value: number;
  percentage: number;
  title?: boolean;
};

export interface Custom {
  noClick?: boolean;
  hiddenLegend?: boolean;
  data?: CustomData[];
}

export interface CustomPointOptions extends PointOptionsObject {
  custom: Custom;
}
