import { styled } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 360,
    padding: 30,
    paddingBottom: '3em',
    h5: {
      paddingBottom: '3em',
      letterSpacing: '1px'
    },
    p: {
      letterSpacing: '1px'
    }
  }
});

export default CustomTooltip;
