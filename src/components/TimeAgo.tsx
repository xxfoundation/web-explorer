import React from 'react';
import TimeAgo, { Formatter, ReactTimeagoProps, Unit } from 'react-timeago';

const overrides: Partial<Record<Unit, string>> = {
  'second': 'sec',
  'minute': 'min'
};

const formatterOverride: Formatter = (value, unit, suffix) => {
  const unitOverride = overrides[unit] ?? unit;
  const converted = value !== 1 ? unitOverride + 's' : unit;
  return `${value} ${converted} ${suffix}`;
}

const TimeAgoComponent: React.FC<ReactTimeagoProps> = (props) => 
  <TimeAgo {...props} formatter={formatterOverride} />

export default TimeAgoComponent;
