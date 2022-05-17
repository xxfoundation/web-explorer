import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';


const LegendItem: FC<{ color: string }> = ({ children, color }) => {
  return (
    <Stack direction='row' alignItems='center' spacing={1} flexWrap='nowrap'>
      <SquareRoundedIcon htmlColor={color} />
      <Typography sx={{ color: '#7A7A7A', textTransform: 'capitalize', whiteSpace: 'nowrap' }} variant='body3'>{children}</Typography>
    </Stack>
  );
}

export default LegendItem;
