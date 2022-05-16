import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC } from 'react';
import { DataPoint } from '../../../types';
import { thousandsFormatter } from '../../blockchain/charts/formatters';

type Props = {
  title?: string;
  data: DataPoint[];
};

const StepChart: FC<Props> = ({ data }) => {
  const options: Options = {
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      {
        data: data,
        step: 'left',
        type: 'line',
        name: 'TOTAL BALANCE',
        marker: { symbol: 'circle' }
      }
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          radius: 2
        }
      }
    },
    yAxis: {
      gridLineWidth: 0,
      title: { text: 'XX COIN', rotation: 0, align: 'low', y: 45 },
      labels: { formatter: thousandsFormatter }
    },
    xAxis: {
      title: {
        text: 'BLOCK NO',
        align: 'low',
        x: -64,
        y: -20
      },
      labels: { formatter: thousandsFormatter },
      tickWidth: 1,
      offset: 75
    },
    title: { text: '' }
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StepChart;
