import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { NUMBER_OF_TICKS } from './config';
import type {
  LabelledSeries,
  SeriesData, SeriesMetadata, TimeInterval
} from './types';
import { nFormatter } from '../../../utils';

const intervalToMilli: Record<TimeInterval, number> = {
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000
};

export const convertToNearestTimestamp = (timestamp: number, interval: TimeInterval) => {
  const intervalMillis = intervalToMilli[interval];
  return dayjs(intervalMillis * Math.floor(timestamp / intervalMillis)).toISOString();
};

const toNearestCeiling = (number: number, tickSize: number) =>
  tickSize * Math.ceil(number / tickSize);

const getMagnitude = (x: number) => Math.floor(Math.log10(x) + 1);

export const intervals: TimeInterval[] = ['1h', '6h', '1d'];

export const convertTimestamps = (timestamps: number[], interval: TimeInterval = '1h', magnitudes?: number[]) => {
  const converted = timestamps.reduce((acc, timestamp, index) => {
    const nearest = convertToNearestTimestamp(timestamp, interval);
    return {
      ...acc,
      [nearest]: (acc[nearest] ?? 0) + (1 * (magnitudes?.[index] ?? 1))
    };
  }, {} as Record<string, number>);

  return Object.entries(converted);
}

export const calculateTickSize = (max: number, numOfTicks: number) => {
  const perTick = max / numOfTicks;
  const magnitude = getMagnitude(perTick) - 1;
  const power = 10 ** magnitude;
  return toNearestCeiling(perTick, power);
};

export const byDay = ([timestamp]: [string, number]) => {
  const date = dayjs.utc(timestamp);
  return dayjs().utc().date() === date.date() ? 'Today' : date.format('YYYY.MM.DD');
};

export const byMonth = ([timestamp]: [string, number]) => {
  const date = dayjs.utc(timestamp);
  return dayjs().utc().month() === date.month() ? 'This month' : date.format('YYYY.MM');
};

export const groupDataByInterval = (
  data: SeriesData['data'],
  interval: TimeInterval
): LabelledSeries => {
  const intervalGroup = interval.includes('h') ? byDay : byMonth;
  const grouped = groupBy(data, intervalGroup);
  return Object.entries(grouped);
};

export const extractInfo = (
  { data, isCurrency, label }: SeriesData,
  interval: TimeInterval,
  numberOfTicks = NUMBER_OF_TICKS
): SeriesMetadata => {
  const maxY = Math.max(...data?.map(([, y]) => y) ?? []);
  const tickSize = calculateTickSize(maxY, numberOfTicks);
  const ticks = Array.from(Array(numberOfTicks).keys()).map((i) => (i + 1) * tickSize);
  const maxTick = Math.max(...ticks);
  const grouped = groupDataByInterval(data, interval);

  return {
    data,
    interval,
    isCurrency,
    label,
    maxY,
    tickSize,
    ticks,
    maxTick,
    grouped
  };
};

export const processUnit = (tick: number) => {
  const truncated = Math.floor(tick * 1000) / 1000;
  const decimals = truncated.toString().split('.')[1]?.length;
  return nFormatter(truncated, decimals)
}