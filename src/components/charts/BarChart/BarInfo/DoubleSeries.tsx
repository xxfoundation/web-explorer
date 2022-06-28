import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useMemo } from 'react';
import FormatBalance from '../../../FormatBalance';
import { useBarchartContext } from '../BarChartContext';
import BarInformation from './BarInformation';

const DoubleSeries: FC = () => {
  const context = useBarchartContext();
  const timestamp = context.timestamp.value;
  const interval = context.interval;
  const count = context.infoA?.counts?.[timestamp] ?? 0;

  const labelA = context.infoA?.label;
  const timeFormat = interval?.includes('h') ? 'YYYY.MM.DD | h:mm A (UTC)' : 'YYYY.MM.DD';

  const formatted = useMemo(
    () => dayjs.utc(parseInt(timestamp, 10)).format(timeFormat),
    [timeFormat, timestamp]
  );

  const countB = context.infoB?.counts?.[timestamp] ?? 0;
  const labelB = context.infoB?.label;

  return (
    <BarInformation>
      <Typography variant='subheader4' style={{ whiteSpace: 'nowrap' }}>
        {formatted}
      </Typography>
      <br />
      <Typography
        sx={{ color: 'primary.dark', fontWeight: 'bold', letterSpacing: '1.5px' }}
        variant='subheader4'
        style={{ whiteSpace: 'nowrap' }}
      >
        {context.infoA?.isCurrency ? <FormatBalance value={count.toString()} /> : `${count} ${labelA}`}
      </Typography>
      &nbsp;|&nbsp;
      <Typography
        sx={{ color: '#7A7A7A', fontWeight: 'bold', letterSpacing: '1.5px' }}
        variant='subheader4'
        style={{ whiteSpace: 'nowrap' }}
      >
        {countB} {labelB}
      </Typography>
    </BarInformation>
  );
};

export default DoubleSeries;
