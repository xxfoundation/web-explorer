import type { WithChildren } from '../../../types';
import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import Loading from '../../Loading';

type Props = WithChildren & {
  title?: string;
  loading?: boolean;
};

const ChartWrap: FC<Props> = ({ children, loading, title }) => {
  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      {title && <Typography variant='h3'>{title}</Typography>}
      {loading ? (
        <Box
          sx={{ height: '398px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Loading />
        </Box>
      ) : (
        children
      )}
    </Stack>
  );
};

export default ChartWrap;
