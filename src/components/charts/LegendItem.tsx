import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Stack, styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { WithChildren } from '../../types';

const LegendTypographyItem = styled(Typography)(({ theme }) => ({
  color: '#7A7A7A',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    fontSize: 9
  }
}));

const Icon = styled(SquareRoundedIcon)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '0.75rem',
    height: '0.75rem'
  }
}));

type Props = WithChildren & { color: string };

const LegendItem: FC<Props> = ({ children, color }) => {
  return (
    <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1 }} flexWrap='nowrap'>
      <Icon htmlColor={color} />
      <LegendTypographyItem variant='body3'>{children}</LegendTypographyItem>
    </Stack>
  );
};

export default LegendItem;
