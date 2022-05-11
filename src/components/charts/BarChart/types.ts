export type TimeInterval = '1h' | '6h' | '1d';
export type TimestampCounts = Record<number, number>;

export type SeriesMetadata = {
  counts: TimestampCounts;
  maxY: number;
  interval: TimeInterval,
  tickSize: number;
  ticks: number[];
  maxTick: number;
}

export type SeriesData = {
  timestamps: number[];
  label?: string;
}

export type LabelledSeries = [string, [string, number][]][];
