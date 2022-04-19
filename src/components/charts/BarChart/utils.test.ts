import * as utils from './utils';

const toMilli = (x: number) => x * 1000;
// 12 total, every 10 minutes
const tenMinCounts = [
  // hour 1
  1577836800, // 2020-01-01 00:00:00 
  1577837400, // 2020-01-01 00:10:00
  1577838000, // 2020-01-01 00:20:00
  1577838600, // 2020-01-01 00:30:00
  1577839200, // 2020-01-01 00:40:00
  1577839800, // 2020-01-01 00:50:00
  // hour 2
  1577840400, // 2020-01-01 01:00:00 
  1577841000, // 2020-01-01 01:10:00
  1577841600, // 2020-01-01 01:20:00
  1577842200, // 2020-01-01 01:30:00
  1577842800, // 2020-01-01 01:40:00
  1577843400  // 2020-01-01 01:50:00
].map(toMilli)


describe(`${utils.getCountsByTimestamp.name} at 1h intervals`, () => {
  it('Should count 1h intervals correctly', () => {
    const counts = utils.getCountsByTimestamp(tenMinCounts, '1h');
    expect(counts[tenMinCounts[0]]).toBe(6);
    expect(counts[tenMinCounts[6]]).toBe(6);
    expect(Object.values(counts).length).toBe(2);
  });
});

// 16 total, every hour
const hourCounts = [
  1577836800, // 2020-01-01 00:00:00 
  1577840400, // 2020-01-01 01:00:00 
  1577844000, // 2020-01-01 02:00:00 
  1577847600, // 2020-01-01 03:00:00 
  1577851200, // 2020-01-01 04:00:00 
  1577854800, // 2020-01-01 05:00:00 
  1577858400, // 2020-01-01 06:00:00 
  1577862000, // 2020-01-01 07:00:00 
  1577865600, // 2020-01-01 08:00:00 
  1577869200, // 2020-01-01 09:00:00 
  1577872800, // 2020-01-01 10:00:00 
  1577876400, // 2020-01-01 11:00:00 
  1577880000, // 2020-01-01 12:00:00 
  1577883600, // 2020-01-01 13:00:00 
  1577887200, // 2020-01-01 14:00:00 
  1577890800  // 2020-01-01 15:00:00 
].map(toMilli);


describe(`${utils.getCountsByTimestamp.name} at 6h intervals`, () => {
  it('Should count 6h intervals correctly', () => {
    const counts = utils.getCountsByTimestamp(hourCounts, '6h');
    expect(counts[hourCounts[0]]).toBe(6);
    expect(counts[hourCounts[6]]).toBe(6);
    expect(counts[hourCounts[12]]).toBe(4);
    expect(Object.values(counts).length).toBe(3);
  });
});

// 20 total, every 4 hours
const fourHourCounts = [
  // day 1
  1577836800, // 2020-01-01 00:00:00
  1577851200, // 2020-01-01 04:00:00
  1577865600, // 2020-01-01 08:00:00
  1577880000, // 2020-01-01 12:00:00
  1577894400, // 2020-01-01 16:00:00
  1577908800, // 2020-01-01 20:00:00
  // day 2
  1577923200, // 2020-01-02 00:00:00
  1577937600, // 2020-01-02 04:00:00
  1577952000, // 2020-01-02 08:00:00
  1577966400, // 2020-01-02 12:00:00
  1577980800, // 2020-01-02 16:00:00
  1577995200, // 2020-01-02 20:00:00
  // day 3
  1578009600, // 2020-01-03 00:00:00
  1578024000, // 2020-01-03 04:00:00
  1578038400, // 2020-01-03 08:00:00
  1578052800, // 2020-01-03 12:00:00
  1578067200, // 2020-01-03 16:00:00
  1578081600, // 2020-01-03 20:00:00
  // day 4
  1578096000, // 2020-01-04 00:00:00
  1578110400  // 2020-01-04 00:00:00
].map(toMilli);

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