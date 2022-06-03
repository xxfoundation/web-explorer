import React, { FC } from 'react';
import FormatBalance from '../../../../components/FormatBalance';
import Link from '../../../../components/Link';
import { BaselineTable } from '../../../../components/Tables';
import TimeAgoComponent from '../../../../components/TimeAgo';

type RewardStashType = {
  eventID: string;
  extrinsicID: string;
  action: string;
  validator: string;
  era: string;
  value: string;
  time: number;
};

const headers = [
  { value: 'Event ID' },
  { value: 'Action' },
  { value: 'Validator (Stash)' },
  { value: 'Era' },
  { value: 'Value' },
  { value: 'Time' }
];

// const sampleData = [
//   {
//     eventID: '123131',
//     extrinsicID: '1231',
//     action: 'Staking (Rewarded)',
//     validator: '15p158r32Z12YyFU7BiqLcqpySmHUedVfJLJ4M73THBixKJY',
//     era: '699',
//     value: '0000000000',
//     time: 1652220328
//   }
// ];

const dataToRow = (props: RewardStashType) => {
  return [
    {
      value: (
        <Link to={`/extrinsic/${props.extrinsicID}?eventId=${props.eventID}`}>{props.eventID}</Link>
      )
    },
    { value: <Link to='#'>{props.action}</Link> },
    {
      value: (
        <Link to={'#'}>
          {props.validator.length >= 16
            ? `${props.validator.slice(0, 6)}....${props.validator.slice(-7, -1)}`
            : props.validator}
        </Link>
      )
    },
    { value: props.era },
    { value: <FormatBalance value={props.value} /> },
    { value: <TimeAgoComponent date={props.time} /> }
  ];
};

const RewardStashTable: FC = ({}) => {
  return <BaselineTable headers={headers} rows={[].map(dataToRow)} />;
};

export default RewardStashTable;
