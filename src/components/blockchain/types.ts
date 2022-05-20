import { PointOptionsObject } from 'highcharts';

export type Block = {
  hash: string;
  number: number;
  finalized: boolean;
  currentEra: number;
  totalEvents: number;
  totalExtrinsics: number;
  timestamp: number;
};

export type ListBlocks = {
  blocks: Block[];
};

export type Transference = {
  hash: string;
  blockNumber: number;
  extrinsicIndex: number;
  source: string;
  destination: string;
  amount: number;
  fee_amount: number;
  section: string;
  method: string;
  success: boolean;
  timestamp: number;
};

export type ListOfTransferences = {
  transfers: Transference[];
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
