import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = {
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
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </Stack>
  );
};

export default ChartWrap;
