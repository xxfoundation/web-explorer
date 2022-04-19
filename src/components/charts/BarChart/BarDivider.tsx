import type { BoxProps } from '@mui/material'
import React, { FC } from 'react';
import { Box,  } from '@mui/material';
import VerticalDivider from './VerticalDivider';

const DividerBox: FC<BoxProps> = ({ children, ...rest }) => (
  <Box {...rest} style={{ display: 'flex', flexDirection: 'column' }}>
    <VerticalDivider style={{ flexGrow: 1, paddingLeft: '0.3rem', paddingRight: '0.3rem' }}>{children}</VerticalDivider>
    <Box sx={{ mt: 1 }} style={{ height: '1rem' }} />
  </Box>
)

export default DividerBox;
