import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

const BarInfo: FC<{ count: number, timestamp: string, timeFormat?: string }> = ({ count, timeFormat = 'YYYY.MM.DD', timestamp }) => {
  const formatted = useMemo(() => dayjs.utc(parseInt(timestamp, 10)).format(timeFormat), [timestamp, timeFormat])

  return (
    <>
      <Typography variant='body4' style={{ whiteSpace: 'nowrap' }}>
        {formatted}
      </Typography>
      <br />
      <Typography
        sx={{ color: 'primary.dark' }}
        variant='subheader4'
        style={{ whiteSpace: 'nowrap' }}>{count} extrinsic{count > 1 ? 's' : ''}</Typography>
    </>
  )
}

export default BarInfo;
