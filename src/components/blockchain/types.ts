import { PointOptionsObject } from 'highcharts';

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
