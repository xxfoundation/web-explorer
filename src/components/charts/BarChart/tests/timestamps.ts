
const toMilli = (x: number) => x * 1000;

// 12 total, every 10 minutes
export const tenMinCounts = [
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

// 16 total, every hour
export const hourCounts = [
  // hour 1
  1577836800, // 2020-01-01 00:00:00 
  1577840400, // 2020-01-01 01:00:00 
  1577844000, // 2020-01-01 02:00:00 
  1577847600, // 2020-01-01 03:00:00 
  1577851200, // 2020-01-01 04:00:00 
  1577854800, // 2020-01-01 05:00:00 
  // hour 6
  1577858400, // 2020-01-01 06:00:00 
  1577862000, // 2020-01-01 07:00:00 
  1577865600, // 2020-01-01 08:00:00 
  1577869200, // 2020-01-01 09:00:00 
  1577872800, // 2020-01-01 10:00:00 
  1577876400, // 2020-01-01 11:00:00 
  // hour 12
  1577880000, // 2020-01-01 12:00:00 
  1577883600, // 2020-01-01 13:00:00 
  1577887200, // 2020-01-01 14:00:00 
  1577890800  // 2020-01-01 15:00:00 
].map(toMilli);

// 20 total, every 4 hours
export const fourHourCounts = [
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
