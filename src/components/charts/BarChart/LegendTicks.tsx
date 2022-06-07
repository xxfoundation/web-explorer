import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import FormatBalance from '../../FormatBalance';

const Container = styled('div')({
  '&.inversed': {
    flexDirection: 'column-reverse'
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1
});

const LegendTicks: FC<{ ticks: number[]; inverse?: boolean, isCurrency?: boolean } & JSX.IntrinsicElements['div']> = ({
  inverse,
  isCurrency,
  ticks,
  ...rest
}) => (
  <Container className={inverse ? 'inversed' : ''} {...rest}>
    {ticks
      .slice(0)
      .reverse()
      .map((tick) => (
        <Typography variant='h4' key={tick}>
          {
            isCurrency
              ? <FormatBalance value={tick.toString()} precision={0} symbol={''} />
              : Math.floor(tick)
          }
          
        </Typography>
      ))}
    <span></span>
  </Container>
);

export default LegendTicks;
