import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { useBarchartContext } from '../BarChartContext';
import BarInformation from './BarInformation';

const timeFormat = 'YYYY.MM.DD';

const SingleSeries: FC = () => {
  const context = useBarchartContext();
  const [selected, count] = context.selected.value ?? ['', 0];
  const label = context.infoA?.label;
  const formatted = useMemo(() => dayjs.utc(selected).format(timeFormat), [selected])
  
  return (
    <BarInformation>
      <Typography variant='body4' style={{ whiteSpace: 'nowrap' }}>
        {formatted}
      </Typography>
      <br />
      <Typography
        sx={{ color: 'primary.dark', fontWeight: 'bold', letterSpacing: '1.5px' }}
        variant='subheader4'
        style={{ whiteSpace: 'nowrap' }}>
          {count} {label}{count > 1 ? 's' : ''}
      </Typography>
    </BarInformation>
  )
}

export default SingleSeries;
