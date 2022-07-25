import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';
import ActivityHeader from './ActivityHeader';

const ElectionActivityTable: FC = () => {
  return <BaselineTable headers={ActivityHeader} rows={[]} />;
};

export default ElectionActivityTable;
