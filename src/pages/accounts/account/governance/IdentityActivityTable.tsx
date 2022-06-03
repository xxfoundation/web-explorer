import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';

const headers = [
  { value: 'Extrinsic ID' },
  { value: 'Block' },
  { value: 'Timestamp' },
  { value: 'Fields' }
];

const IdentityActivityTable: FC = () => {
  return <BaselineTable headers={headers} rows={[]} />;
};

export default IdentityActivityTable;
