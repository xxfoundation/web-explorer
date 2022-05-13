import { Button, Stack, Typography } from '@mui/material';
import React, { FC }  from 'react';

import { useBarchartContext } from './BarChartContext';

import { intervals } from './utils';

const Controls: FC = () => {
  const { interval } = useBarchartContext();

  return (
    <Stack direction='row'>
      {intervals.map((option) => (
        <Button
          key={option}
          variant='text'
          color={interval.value === option ? 'primary' : 'inherit'}
          onClick={interval.makeSetter(option)}
        >
          <Typography
            style={{ letterSpacing: 5 }}
            variant={'subheader4'}
            color={interval.value === option ? 'primary' : 'inherit'}>
            {option}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
}

export default Controls;
