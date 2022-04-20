import * as utils from '../utils';
import { tenMinCounts, hourCounts, fourHourCounts } from './timestamps';

describe(`${utils.getCountsByTimestamp.name} at 1h intervals`, () => {
  it('Should count 1h intervals correctly', () => {
    const counts = utils.getCountsByTimestamp(tenMinCounts, '1h');
    expect(counts[tenMinCounts[0]]).toBe(6);
    expect(counts[tenMinCounts[6]]).toBe(6);
    expect(Object.values(counts).length).toBe(2);
  });
});

describe(`${utils.getCountsByTimestamp.name} at 6h intervals`, () => {
  it('Should count 6h intervals correctly', () => {
    const counts = utils.getCountsByTimestamp(hourCounts, '6h');
    expect(counts[hourCounts[0]]).toBe(6);
    expect(counts[hourCounts[6]]).toBe(6);
    expect(counts[hourCounts[12]]).toBe(4);
    expect(Object.values(counts).length).toBe(3);
  });
});

describe(`${utils.getCountsByTimestamp.name} at 1d intervals`, () => {
  it('Should count 1d intervals correctly', () => {
    const counts = utils.getCountsByTimestamp(fourHourCounts, '1d');
    expect(counts[fourHourCounts[0]]).toBe(6);
    expect(counts[fourHourCounts[6]]).toBe(6);
    expect(counts[fourHourCounts[12]]).toBe(6);
    expect(counts[fourHourCounts[18]]).toBe(2);
    expect(Object.values(counts).length).toBe(4);
  });
});

describe(`${utils.calculateTickSize.name} works correctly`, () => {
  it('split 60 in 20s', () => {
    const tickSize = utils.calculateTickSize(60, 3);
    expect(tickSize).toEqual(20);
  });

  it('split 45 in 20s', () => {
    const tickSize = utils.calculateTickSize(45, 3);
    expect(tickSize).toEqual(20);
  });

  it('split 30 in 10s', () => {
    const tickSize = utils.calculateTickSize(30, 3);
    expect(tickSize).toEqual(10);
  });

  it('split 100 in 40s', () => {
    const tickSize = utils.calculateTickSize(100, 3);
    expect(tickSize).toEqual(40);
  });

  it('split 500 in 200s', () => {
    const tickSize = utils.calculateTickSize(500, 3);
    expect(tickSize).toEqual(200);
  })
});
