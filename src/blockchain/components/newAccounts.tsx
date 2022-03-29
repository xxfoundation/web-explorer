import React from 'react';
import { LineChart } from '../../charts/highcharts';
import { DataPoint } from '../../types';

const data: DataPoint[] = [[123,1231], [441,6671], [155,667]]

const NewAccounts = () => {
  const sortedData = data.sort((a: number[], b: number[]) => a[0] - b[0]);

  return (
    <>
      <LineChart
        title='NEW ACCOUNTS high'
        data={sortedData}
      />
    </>
  );
};

export default NewAccounts;
