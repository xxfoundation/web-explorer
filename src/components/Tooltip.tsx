import { styled } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#4F4F4F',
    padding: '1.25rem',
    fontSize: '0.75rem',
    h5: {
      letterSpacing: '1px',
      textTransform: 'uppercase',
      margin: '0 0 0.5rem'
    },
    p: {
      textTransform: 'capitalize',
      letterSpacing: '8%',
      fontSize: 10,
      fontWeight: 400,
    }
  }
});

export default CustomTooltip;
