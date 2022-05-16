import React, { FC } from 'react';
import StepChart from '../../../../components/charts/highcharts/StepChart';
import { DataPoint } from '../../../../types';

// y 55 600K => 54 200K
// x 8 958K => 8 936K
// const data: DataPoint[] = [
//   [8935000, 54300],
//   [8936000, 54300],
//   [8936500, 54400],
//   [8937000, 54500],
//   [8938000, 54500]
// ];

function getRandomY() {
  const min = Math.ceil(54000000);
  const max = Math.floor(56000000);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomX() {
  const min = Math.ceil(8900000);
  const max = Math.floor(8960000);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const data: DataPoint[] = Array.from(Array(100).keys())
  .map((): [number, number] => {
    return [getRandomX(), getRandomY()];
  })
  .sort((a: number[], b: number[]) => a[0] - b[0]);

const BalanceHistoryChart: FC = () => {
  return <StepChart data={data} />;
};

export default BalanceHistoryChart;
