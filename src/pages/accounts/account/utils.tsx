import { Divider, Stack, StackProps, styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../themes/default';

export const TypographyHeader = styled(Typography)(({}) => ({
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: '.5px',
  textTransform: 'uppercase',
  color: theme.palette.grey[600]
}));

export const TypographyBody: FC = ({ children }) => {
  return (
    <Typography
      marginLeft={'30px'}
      letterSpacing={'8%'}
      fontSize={14}
      fontWeight={400}
      color={theme.palette.grey[500]}
    >
      {children}
    </Typography>
  );
};

export const InfoCardRow: FC<StackProps> = ({ children, ...props }) => {
  return (
    <Stack
      direction={'row'}
      divider={<Divider flexItem variant='middle' orientation='vertical' />}
      spacing={3}
      marginBottom={'6px'}
      alignItems={'center'}
      { ...props}
    >
      {children}
    </Stack>
  );
};
