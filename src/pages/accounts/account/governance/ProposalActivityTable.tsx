import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';

const header = [
  { value: 'Extrinsic ID' },
  { value: 'Block' },
  { value: 'Timestamp' },
  { value: 'Proposal Hash' }
];

const ProposalActivityTable: FC = () => {
  return <BaselineTable headers={header} rows={[]} />;
};

export default ProposalActivityTable;
