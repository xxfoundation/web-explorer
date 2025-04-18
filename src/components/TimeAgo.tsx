import { Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import TimeAgo, { Formatter, ReactTimeagoProps, Unit } from 'react-timeago';

const overrides: Partial<Record<Unit, string>> = {
  'second': 'sec',
  'minute': 'min'
};

const defaultFormat = 'll LTS Z';

const formatterOverride: Formatter = (value, unit, suffix) => {
  const unitOverride = overrides[unit] ?? unit;
  return `${value} ${unitOverride} ${suffix}`;
}

type Props = {
  dateFormat?: string;
}

const TimeAgoComponent: React.FC<ReactTimeagoProps & Props> = ({ dateFormat = defaultFormat, ...props }) => {
  const formattedDate = useMemo(
    () => dayjs.utc(props.date).format(dateFormat),
    [dateFormat, props.date]
  );

  return (
    <Tooltip title={formattedDate} placement='top' arrow>
      <span>
        <TimeAgo
          data-tip={formattedDate}
          {...props}
          title={''}
          formatter={formatterOverride}
        />
      </span>
    </Tooltip>
  );
}
  
  

export default TimeAgoComponent;
