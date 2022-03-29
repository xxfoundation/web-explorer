import { PointOptionsObject } from "highcharts";

export enum BlockStatus {
  Pending = 'pending'
}

export type Block = {
  id: number,
  intrinsic: number,
  events: number;
  status: BlockStatus,
  timestamp: number
}

export type PercentageValues = {
  team: {
    value: number;
    percentage: number;
  },
  foundation: {
    value: number;
    percentage: number;
  }
}

export type StakeablePopup = {
  noClick?: boolean;
  hiddenLegend?: boolean;
  stakeable: PercentageValues;
  unstakeable: PercentageValues;
}

export interface CustomPointOptions<Custom> extends PointOptionsObject {
  custom: Custom
}
