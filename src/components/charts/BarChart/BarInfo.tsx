import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { styled, Typography } from '@mui/material';

const BarInformation = styled('div')(({ theme }) => ({
  visibility: 'hidden',
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: theme.spacing(1.5),
  marginLeft: theme.spacing(1.25),
  padding: theme.spacing(2),
  paddingBottom: 0,
  borderLeft: 'solid 1px',
  borderColor: theme.palette.grey[300],
  color: theme.palette.grey[400],
}))

const BarInfo: FC<{ count: number, label: string, timestamp: string, timeFormat?: string }> = ({ count, label, timeFormat = 'YYYY.MM.DD', timestamp }) => {
  const formatted = useMemo(() => dayjs.utc(parseInt(timestamp, 10)).format(timeFormat), [timestamp, timeFormat])

  return (
    <BarInformation>
      <Typography variant='body4' style={{ whiteSpace: 'nowrap' }}>
        {formatted}
      </Typography>
      <br />
      <Typography
        sx={{ color: 'primary.dark' }}
        variant='subheader4'
        style={{ whiteSpace: 'nowrap' }}>{count} {label}{count > 1 ? 's' : ''}</Typography>
    </BarInformation>
  )
}

export default BarInfo;
