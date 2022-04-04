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
    () => dayjs(props.date).format(dateFormat),
    [dateFormat, props.date]
  );

  return (
    <UIDReset>
      <UIDConsumer>
        {(id) => (
          <>
            <TimeAgo
              data-for={id}
              data-tip={formattedDate}
              {...props}
              formatter={formatterOverride}
            />
            <Tooltip
              text={formattedDate}
              trigger={id}
              place='top'
            />
          </>
        )}
      </UIDConsumer>
    </UIDReset>
  );
}
  
  

export default TimeAgoComponent;
