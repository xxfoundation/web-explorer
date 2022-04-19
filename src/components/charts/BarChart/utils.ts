import type { TimestampCounts, TimeInterval } from './types';

import dayjs from 'dayjs';

const intervalToMilli: Record<TimeInterval, number> = {
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000
}

const convertToNearestTimestamp = (timestamp: number, interval: TimeInterval) => {
  const intervalMillis = intervalToMilli[interval];
  return intervalMillis * Math.floor(timestamp / intervalMillis);
}

const toNearestCeiling = (number: number, tickSize: number) => tickSize * Math.ceil(number / tickSize);

const getMagnitude = (x: number) => Math.floor( Math.log10(x) + 1);

export const intervals: TimeInterval[] = ['1h', '6h', '1d'];

export const getCountsByTimestamp = (
  timestamps: number[],
  interval: TimeInterval = '1h'
) => timestamps.reduce(
  (acc, timestamp) => {
    const nearest = convertToNearestTimestamp(timestamp, interval);

    
    return {
      ...acc,
      [nearest]: (acc[nearest] ?? 0) + 1
    };
  },
  {} as TimestampCounts
);

export const calculateTickSize = (max: number, numOfTicks: number) => {
  const perTick = max / numOfTicks;
  const magnitude = getMagnitude(perTick) - 1;
  const power = Math.pow(10, magnitude);
  return toNearestCeiling(perTick, power);
}

export const byDay = ([timestamp]: [string, number]) => {
  const date = dayjs.utc(parseInt(timestamp));
  return dayjs().utc().day() === date.day() ? 'Today' : date.format('YYYY.MM.DD');
}

export const byMonth = ([timestamp]: [string, number]) => {
  const date = dayjs.utc(parseInt(timestamp));
  return dayjs().utc().month() === date.month() ? 'This month' : date.format('YYYY.MM');
}