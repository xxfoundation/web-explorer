import { Box, CircularProgress } from '@mui/material';
import React, { FC } from 'react';

const Loader: FC = () => (
  <Box justifyContent='center' alignItems='center' display='flex' height={'inherit'}>
    <CircularProgress />
  </Box>
);

export default Loader;
