import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';

const headers = [{ value: 'Extrinsic ID' }, { value: 'Block' }, { value: 'Type' }];

const ReferendaActivityTable: FC = () => {
  return <BaselineTable headers={headers} rows={[]} />;
};

export default ReferendaActivityTable;
