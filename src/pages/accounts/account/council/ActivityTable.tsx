import { Typography } from '@mui/material';
import React, { FC } from 'react';
import Link from '../../../../components/Link';
import { BaselineTable } from '../../../../components/Tables';

type ActivityType = {
  block: number;
  type: string;
  transaction: string;
};

const headers = [{ value: 'block' }, { value: 'type' }];

const activityToRows = (item: ActivityType) => {
  return [
    { value: <Link to={`/blocks/${item.block}`}>{item.block}</Link> },
    { value: <Typography>`voted on ${item.type}`</Typography> }
  ];
};

const sampleData = [
  {
    block: 6207174,
    type: '0x0453ac736bde44e8f78e0b1a7f33c32bc4fa06317473cca19432a2cb53344906',
    transaction: '12313221'
  }
];

const CouncilActivityTable: FC = () => {
  return <BaselineTable headers={headers} rows={sampleData.map(activityToRows)} />;
};

export default CouncilActivityTable;
