import { Button, Stack, Typography } from '@mui/material';
import React, { FC, useCallback }  from 'react';

export type TimeInterval = '1h' | '6h' | '1d';

const intervals: TimeInterval[] = ['1h', '6h', '1d'];

export const intervalToMilli: Record<TimeInterval, number> = {
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000
}

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
          <Typography style={{ letterSpacing: 5 }} variant={'body3'} color={selected === option ? 'primary' : 'inherit'}>
            {option}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
}

export default Controls;