import { Stack, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import CopyButton from './buttons/CopyButton';
import React, { FC } from 'react';

export const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

export const HashColumnWithTooltip: FC<{ hash: string }> = ({ children, hash }) => {
  return (
    <CustomWidthTooltip
      title={
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant='body5'>{hash}</Typography>
          <CopyButton value={hash} />
        </Stack>
      }
      placement='left'
      arrow
    >
      <span>{children}</span>
    </CustomWidthTooltip>
  );
};

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
