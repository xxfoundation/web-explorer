import React from 'react';
import { DataPoint } from '../../../types';
import { LineChart } from '../../charts/highcharts';
import PaperWithHeader from '../PaperWithHeader';
import { amountByEraTooltip } from './formatters';

const data: DataPoint[] = [
  [123, 1231],
  [441, 6671],
  [155, 667]
];

const NewAccounts = () => {
  const sortedData = data.sort((a: number[], b: number[]) => a[0] - b[0]);

  return (
    <PaperWithHeader header='New Accounts'>
      <LineChart data={sortedData} tooltipFormatter={amountByEraTooltip} />
    </PaperWithHeader>
  );
};

export default NewAccounts;
