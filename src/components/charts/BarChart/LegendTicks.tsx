import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { processUnit } from './utils';

const Container = styled('div')({
  '&.inversed': {
    flexDirection: 'column-reverse'
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1
});

const LegendTicks: FC<
  { ticks: number[]; inverse?: boolean; isCurrency?: boolean } & JSX.IntrinsicElements['div']
> = ({ inverse, isCurrency, ticks, ...rest }) => {
  return (
    <Container className={inverse ? 'inversed' : ''} {...rest}>
      {ticks
        .slice(0)
        .reverse()
        .map((tick) => (
          <Typography variant='h4' key={tick}>
            {isCurrency ? processUnit(tick / 1e9) : processUnit(tick)}
          </Typography>
        ))}
      <span></span>
    </Container>
  );
};

export default LegendTicks;
