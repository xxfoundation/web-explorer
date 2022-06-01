import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

const Container = styled('div')({
  '&.inversed': {
    flexDirection: 'column-reverse'
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1
});

const LegendTicks: FC<{ ticks: number[]; inverse?: boolean } & JSX.IntrinsicElements['div']> = ({
  inverse,
  ticks,
  ...rest
}) => (
  <Container className={inverse ? 'inversed' : ''} {...rest}>
    {ticks
      .slice(0)
      .reverse()
      .map((tick) => (
        <Typography variant='h4' key={tick}>
          {tick}
        </Typography>
      ))}
    <span></span>
  </Container>
);

export default LegendTicks;
