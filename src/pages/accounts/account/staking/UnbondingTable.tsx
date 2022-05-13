import React, { FC } from 'react';
import FormatBalance from '../../../../components/FormatBalance';
import { BaselineTable } from '../../../../components/Tables';

type UnbondingType = {
  countdown: string;
  value: number;
};

const sampleData: UnbondingType[] = [
  {
    countdown: 'Ended',
    value: 4155151515
  }
];

const headers = [{ value: 'countdown' }, { value: 'value' }];

const unbondingToRow = (item: UnbondingType) => {
  return [{ value: item.countdown }, { value: <FormatBalance value={item.value.toString()} /> }];
};

const UnbondingTable: FC = () => {
  return <BaselineTable rows={sampleData.map(unbondingToRow)} headers={headers} />;
};

export default UnbondingTable;
