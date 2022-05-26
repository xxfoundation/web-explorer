import { Stack } from '@mui/material';
import React, { FC } from 'react';

import LegendItem from './LegendItem';

type Data = {
  label: string;
  color: string;
}

type Props = {
  data: Data[]
}

const Legend: FC<Props> = ({ data }) => (
  <Stack spacing={1}>
    {data.map(({ color, label }) => (
      <LegendItem key={`${color}-${label}`} color={color}>
        {label}
      </LegendItem>
    ))}
  </Stack>
)

export default Legend;
