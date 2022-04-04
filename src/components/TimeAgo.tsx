import React, { useMemo } from 'react';
import TimeAgo, { Formatter, ReactTimeagoProps, Unit } from 'react-timeago';
import { UIDReset, UIDConsumer} from 'react-uid';
import dayjs from 'dayjs';
import Tooltip from './Tooltip';

const overrides: Partial<Record<Unit, string>> = {
  'second': 'sec',
  'minute': 'min'
};

const defaultFormat = 'llll Z';

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
    <UIDReset>
      <UIDConsumer>
        {(id) => (
          <>
            <TimeAgo
              data-for={`timeago-${id}`}
              data-tip={formattedDate}
              {...props}
              title={''}
              formatter={formatterOverride}
            />
            <Tooltip
              text={formattedDate}
              trigger={`timeago-${id}`}
              place='top'
              offset={{ top: 8 }}
            />
          </>
        )}
      </UIDConsumer>
    </UIDReset>
  );
}
  
  

export default TimeAgoComponent;
