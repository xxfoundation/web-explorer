import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { theme } from '../../themes/default';

export const TypographyBodyBold: FC = ({ children }) => {
  return (
    <Typography
      fontWeight={700}
      fontSize={14}
      letterSpacing={'.5px'}
      textTransform={'uppercase'}
      color={theme.palette.grey[600]}
      width={'100px'}
    >
      {children}
    </Typography>
  );
};

export const TypographyBodyLight: FC = ({ children }) => {
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

export const LabelValueWithDivider: FC<{
  label: string;
  value: ReactNode;
  marginY?: string;
}> = ({ label, marginY, value }) => {
  return (
    <Stack
      direction='row'
      marginY={marginY}
      divider={<Divider orientation='vertical' variant='fullWidth' flexItem />}
    >
      <TypographyBodyBold>{label}</TypographyBodyBold>
      <TypographyBodyLight>{value}</TypographyBodyLight>
    </Stack>
  );
};
