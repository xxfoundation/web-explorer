import { Divider, Stack } from '@mui/material';
import React, { FC } from 'react';

import LegendItem from './LegendItem';

type Data = {
  label: string;
  color: string;
};

type Props = {
  data: Data[];
};

const Legend: FC<Props> = ({ data }) => (
  <Stack spacing={{ xs: 0.5, sm: 0.5 }}>
    {data.map(({ color, label }) =>
      label.includes('Stakeable') ? (
        <React.Fragment key={`${color}-${label}`}>
          <Divider />
          <LegendItem color={color}>
            {label}
          </LegendItem>
        </React.Fragment>
      ) : (
        <LegendItem key={`${color}-${label}`} color={color}>
          {label}
        </LegendItem>
      )
    )}
  </Stack>
);

export default Legend;
