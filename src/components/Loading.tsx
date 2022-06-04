import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading: FC = () => (
  <Box
    sx={{
      height: 'inherit',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    }}
  >
    <CircularProgress />
  </Box>
)

export default Loading;
