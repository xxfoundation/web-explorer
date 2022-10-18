import React, { FC } from 'react';
import { Box, Tabs, styled } from '@mui/material';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '&:after': {
    content: '" "',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    height: 1,
    backgroundColor:  theme.palette.grey[300],
  },
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  backgroundColor: '#f6f6f6',
  '& .MuiTab-root': {
    zIndex: 1,
    '&:first-child': {
      paddingLeft: '2rem',
    },
    '&.Mui-selected': {
      borderBottom: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    padding: '1.5rem',
    borderRightStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.grey[300]
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
}));

type PanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const Panel: FC<PanelProps> = ({ children, index, value, ...other }) => (
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


export default StyledTabs;


