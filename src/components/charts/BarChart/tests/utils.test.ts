import * as utils from '../utils';
import { tenMinCounts, hourCounts, fourHourCounts } from './timestamps';

describe(`${utils.convertTimestamps.name} at 1h intervals`, () => {
  it('Should count 1h intervals correctly', () => {
    const counts = utils.convertTimestamps(tenMinCounts, '1h');
    expect(counts[0][1]).toBe(6);
    expect(counts[1][1]).toBe(6);
    expect(Object.values(counts).length).toBe(2);
  });
});

describe(`${utils.convertTimestamps.name} at 6h intervals`, () => {
  it('Should count 6h intervals correctly', () => {
    const counts = utils.convertTimestamps(hourCounts, '6h');
    expect(counts[0][1]).toBe(6);
    expect(counts[1][1]).toBe(6);
    expect(counts[2][1]).toBe(4);
    expect(Object.values(counts).length).toBe(3);
  });
});

describe(`${utils.convertTimestamps.name} at 1d intervals`, () => {
  it('Should count 1d intervals correctly', () => {
    const counts = utils.convertTimestamps(fourHourCounts, '1d');
    expect(counts[0][1]).toBe(6);
    expect(counts[1][1]).toBe(6);
    expect(counts[2][1]).toBe(6);
    expect(counts[3][1]).toBe(2);
    expect(Object.values(counts).length).toBe(4);
  });
});

describe(`${utils.calculateTickSize.name} works correctly`, () => {
  it('split 60 in 20s', () => {
    const tickSize = utils.calculateTickSize(60, 3);
    expect(tickSize).toEqual(20);
  });

  it('split 80 in 30s', () => {
    const tickSize = utils.calculateTickSize(80, 3);
    expect(tickSize).toEqual(30);
  })

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
