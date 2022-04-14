import React, { FC } from 'react';
import Highcharts, { Options, SeriesBarOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const defaultOptions: Options ={
  chart: {
      type: 'column'
  },
  title: {
      text: ''
  },
  yAxis: {
      gridLineColor: '',
      lineColor: '',
      min: 0,
      tickInterval: 20,
      title: {
        text: ''
      },
      plotLines: [],
  },
  xAxis: {
    lineColor: '',
    tickColor: '',
    tickInterval: 2,
  },
  legend: { enabled: false },
  plotOptions: {
    column: {
      borderRadius: 6,
      pointWidth: 14,
    }
  },
  series: [{
      type: 'column',
      name: 'Hour',
      data: Array.from(Array(24).keys()).map(() => Math.floor(Math.random() * 60)),
  }]
};

type Props = {
  series?: SeriesBarOptions[]; 
}

const BarChart: FC<Props> = ({ series }) => (
<HighchartsReact
  highcharts={Highcharts}
  options={{
    ...defaultOptions
  }} />
);
export default BarChart;