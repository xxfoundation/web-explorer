import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';

const headers = [
  { value: 'Extrinsic ID' },
  { value: 'Block' },
  { value: 'Validator' },
  { value: 'Validator Stake' },
  { value: 'Own Stake' },
  { value: 'Total Stake' },
  { value: 'Nominators' },
  { value: 'Commission' },
  { value: 'Own Share' }
];
const NominatorActivityTable: FC = () => {
  return <BaselineTable headers={headers} rows={[]} />;
};

export default NominatorActivityTable;
