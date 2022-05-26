import { TooltipFormatterContextObject } from 'highcharts';
import React, { FC } from 'react';
import StepChart from '../../../../components/charts/highcharts/StepChart';
import { formatBalance } from '../../../../components/FormatBalance/formatter';
import { DataPoint } from '../../../../types';

function getRandomY() {
  const min = Math.ceil(54000000);
  const max = Math.floor(56000000);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomX() {
  const min = Math.ceil(89000);
  const max = Math.floor(89600);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this?.y?.toString(), { decimals: 0, withUnit: ' XX' });
  return `${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const data: DataPoint[] = Array.from(Array(100).keys())
  .map((): [number, number] => {
    return [getRandomX(), getRandomY()];
  })
  .sort((a: number[], b: number[]) => a[0] - b[0]);

const BalanceHistoryChart: FC = () => {
  return (
    <StepChart
      seriesName='TOTAL BALANCE'
      xName='Block'
      yName='Balance (XX)'
      data={data}
      tooltipFormatter={amountByEraTooltip}
    />
  );
};

export default BalanceHistoryChart;
