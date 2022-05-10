import type { BoxProps } from '@mui/material'
import React, { FC } from 'react';
import { Box,  } from '@mui/material';
import VerticalDivider from './VerticalDivider';

const BarDividerBox: FC<BoxProps> = ({ children, ...rest }) => (
  <Box {...rest} style={{ ...rest.style, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    <VerticalDivider style={{ flexGrow: 1, paddingLeft: '0.3rem', paddingRight: '0.3rem' }}>{children}</VerticalDivider>
  </Box>
)

export default BarDividerBox;
