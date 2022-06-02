import { Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TimeInterval } from './types';
import { intervals } from './utils';

const intervalMapToTimestamp: Record<TimeInterval, () => number> = {
  '1h': () => {
    const minRange = new Date();
    minRange.setHours(minRange.getHours() - 48);
    return minRange.getTime();
  },
  '6h': () => {
    const minRange = new Date();
    minRange.setHours(minRange.getHours() - 24 * 10);
    return minRange.getTime();
  },
  '1d': () => {
    const minRange = new Date();
    minRange.setMonth(minRange.getMonth() - 1);
    minRange.setHours(0, 0, 0, 0);
    return minRange.getTime();
  }
};

export const intervalToTimestamp = (interval: TimeInterval) => intervalMapToTimestamp[interval]();

const IntervalControls: FC<{
  loading?: boolean;
  interval: TimeInterval;
  setInterval: (interval: TimeInterval) => void;
}> = ({ interval, loading, setInterval }) => {
  return (
    <Stack direction='row'>
      {intervals.map((option) => (
        <Button
          key={option}
          variant='text'
          disabled={loading}
          onClick={() => setInterval(option)}
          color={interval === option ? 'primary' : 'inherit'}
        >
          <Typography
            style={{ letterSpacing: 5 }}
            variant={'subheader4'}
            color={interval === option ? 'primary' : 'inherit'}
          >
            {option}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
};

export default IntervalControls;
