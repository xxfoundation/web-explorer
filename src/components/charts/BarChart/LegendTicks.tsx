import React, { FC } from 'react';
import { styled, Typography } from '@mui/material';

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1
}))

const LegendTicks: FC<{ ticks: number[] } & JSX.IntrinsicElements['div']> = ({ ticks, ...rest }) => (
  <Container {...rest}>
    {ticks.slice(0).reverse().map((tick) => (
      <Typography variant='h4' key={tick}>{tick}</Typography>
    ))}
    <span></span>
  </Container>
)

export default LegendTicks;
