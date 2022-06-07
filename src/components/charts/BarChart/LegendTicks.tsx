import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { nFormatter } from '../../../utils';
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

const processTick = (tick: number) => {
  const truncated = Math.floor(tick * 1000) / 1000;
  const decimals = truncated.toString().split('.')[1]?.length;
  return nFormatter(truncated, decimals)
}

const LegendTicks: FC<{ ticks: number[]; inverse?: boolean, isCurrency?: boolean } & JSX.IntrinsicElements['div']> = ({
  inverse,
  isCurrency,
  ticks,
  ...rest
}) => {

  return (
    <Container className={inverse ? 'inversed' : ''} {...rest}>
      {ticks
        .slice(0)
        .reverse()
        .map((tick) => (
          <Typography variant='h4' key={tick}>
            {
              isCurrency
                ? <FormatBalance value={tick.toString()} symbol={''} precision={0} />
                : processTick(tick)
            }
          </Typography>
        ))}
      <span></span>
    </Container>
  );
}

export default LegendTicks;
