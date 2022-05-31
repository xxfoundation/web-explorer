import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';

type Props = {
  title?: string;
}

const ChartWrap: FC<Props> = ({ children, title }) => (
  <Stack spacing={4} sx={{ width: '100%' }}>
    {title && <Typography variant='h3'>{title}</Typography>}
    {children}
  </Stack>
);

export default ChartWrap;
