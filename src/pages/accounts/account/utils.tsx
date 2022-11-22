import { WithChildren } from '../../../types';
import { Container, Stack, StackProps, styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../themes/default';

export const TypographyHeader = styled(Typography)(({}) => ({
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: '.5px',
  textTransform: 'uppercase',
  color: theme.palette.grey[600]
}));

export const TypographyBody: FC<WithChildren> = ({ children }) => (
  <Typography
    marginLeft={'30px'}
    fontSize={14}
    fontWeight={400}
    color={theme.palette.grey[500]}
  >
    {children}
  </Typography>
);

export const InfoCardRow: FC<StackProps> = ({ children, ...props }) => (
  <Stack
    direction={'row'}
    spacing={3}
    marginBottom={'6px'}
    alignItems={'center'}
    { ...props}
  >
    {children}
  </Stack>
);

export const InfoMessage: FC<{message: string}> = ({ message }) => (
  <Container sx={{ my: 1 }}>
    <Typography variant='body3' maxWidth={'400px'}>
      {message}
    </Typography>
  </Container>
);
