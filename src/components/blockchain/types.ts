import { PointOptionsObject } from 'highcharts';

export type Block = {
  block_hash: string;
  block_number: number;
  block_number_finalized: number;
  current_era: number;
  total_events: number;
  num_transfers: number;
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

export type StakeablePopup = {
  noClick?: boolean;
  hiddenLegend?: boolean;
  stakeable: PercentageValues;
  unstakeable: PercentageValues;
};

export interface CustomPointOptions<Custom> extends PointOptionsObject {
  custom: Custom;
}
