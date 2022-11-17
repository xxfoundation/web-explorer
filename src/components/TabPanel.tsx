import React, { FC } from 'react';
import { Box } from '@mui/material';

type PanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Panel: FC<PanelProps> = ({ children, index, value, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box>
        {children}
      </Box>
    )}
  </div>
);

export default Panel;
