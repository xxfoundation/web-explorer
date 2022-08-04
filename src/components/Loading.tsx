import type { WithChildren } from '../types';

import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

type Props = WithChildren & { loading?: boolean };

const Loading: FC<Props> = ({
  children,
  loading
}) => (
  <>
    {loading === false ? children : (
      <Box
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          minWidth: '6rem'
        }}
      >
        <CircularProgress />
      </Box>
    )}
  </>
  
)

export default Loading;
