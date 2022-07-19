export type TimeInterval = '1h' | '6h' | '1d';

export type LabelledSeries = [string, [string, number][]][];

export type SeriesMetadata = {
  data?: [string, number][];
  label?: string;
  maxY: number;
  interval: TimeInterval;
  tickSize: number;
  ticks: number[];
  maxTick: number;
  grouped: LabelledSeries;
  isCurrency?: boolean;
}

export type SeriesData = {
  data?: [string, number][];
  label?: string;
  magnitudes?: number[];
  isCurrency?: boolean;
}

