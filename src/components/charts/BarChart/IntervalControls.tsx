import { Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TimeInterval } from './types';
import { intervals } from './utils';

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
