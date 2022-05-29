import type { DataPoint } from './highcharts';
import React from 'react';
import { LineChart }  from './highcharts';

import ChartWrap from './highcharts/ChartWrap';

const data: DataPoint[] = [
  [123, 1231],
  [441, 6671],
  [155, 667]
];

const NewAccounts = () => {
  return (
    <ChartWrap title='New Accounts'>
      <LineChart data={data} />
    </ChartWrap>
  );
};

export default NewAccounts;
