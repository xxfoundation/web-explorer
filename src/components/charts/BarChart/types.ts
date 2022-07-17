export type TimeInterval = '1h' | '6h' | '1d';
export type TimestampCounts = Record<string, number>;

export type LabelledSeries = [string, [string, number][]][];

export type SeriesMetadata = {
  label?: string;
  counts: TimestampCounts;
  maxY: number;
  interval: TimeInterval;
  tickSize: number;
  ticks: number[];
  maxTick: number;
  grouped: LabelledSeries;
  isCurrency?: boolean;
}

export type SeriesData = {
  timestamps: number[];
  label?: string;
  magnitudes?: number[];
  isCurrency?: boolean;
}

