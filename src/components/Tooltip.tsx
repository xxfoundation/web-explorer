import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React from 'react';

export const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
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
      fontWeight: 400
    }
  }
});
