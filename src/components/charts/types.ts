
declare module 'chart.js' {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}

import type { PointOptionsObject } from 'highcharts';

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

export type Transfer = {
  hash: string;
  blockNumber: number;
  extrinsicIndex: number;
  source: string;
  destination: string;
  amount: number;
  fee_amount: number;
  module: string;
  call: string;
  success: boolean;
  timestamp: number;
};

export type ListOfTransfers = {
  transfers: Transfer[];
};

export type Timeframe = 'All' | 'Quarter' | 'Month'