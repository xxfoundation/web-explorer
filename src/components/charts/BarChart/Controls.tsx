import type { TimeInterval } from './types';

import { Button, Stack, Typography } from '@mui/material';
import React, { FC, useCallback }  from 'react';

import { intervals } from './utils';

type Props = {
  onSelect: (interval: TimeInterval) => void;
  selected: TimeInterval
}

const Controls: FC<Props> = ({ onSelect, selected }) => {
  const select = useCallback((interval: TimeInterval) => () => onSelect(interval), [onSelect]);
  
  return (
    <Stack direction='row'>
      {intervals.map((option) => (
        <Button
          key={option}
          variant='text'
          color={selected === option ? 'primary' : 'inherit'}
          onClick={select(option)}
        >
          <Typography style={{ letterSpacing: 5 }} variant={'subheader4'} color={selected === option ? 'primary' : 'inherit'}>
            {option}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
}

export default Controls;
