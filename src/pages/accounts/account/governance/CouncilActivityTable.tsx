import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';
import ActivityHeader from './ActivityHeader';

const CouncilActivityTable: FC = () => {
  return <BaselineTable headers={ActivityHeader} rows={[]} />;
};

export default CouncilActivityTable;
