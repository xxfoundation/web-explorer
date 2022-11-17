import type { WithChildren } from '../types';
import type { BoxProps } from '@mui/material';

import React, { FC } from 'react';
import { Box, styled } from '@mui/material';

const CodeDisplayComponent = styled(Box)(({ theme }) => ({
  margin: '0.25em',
  borderColor: theme.palette.grey['200'],
  padding: '0.5rem',
  borderRadius: '10px',
  borderStyle: 'solid',
  borderWidth: '1px',
  background: 'rgb(0 0 0 / 4%)',
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.5rem',
    overflow: 'auto',
    maxWidth: '8rem',
    marginLeft: '1rem'
  },
}));

type Props = WithChildren & Omit<BoxProps, 'component'> & {
  maxHeight?: number;
}

const CodeDisplay: FC<Props> = ({ children, ...props }) => (
  <CodeDisplayComponent
    component={'pre'}
    {...props}
    maxHeight={props.maxHeight ?? 75}
  >
    {children}
  </CodeDisplayComponent>
);

export default CodeDisplay;
