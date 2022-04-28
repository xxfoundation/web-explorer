import type { Options } from 'highcharts';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options: Options = {
  chart: {
    plotShadow: false,
    type: 'pie',
    height: '180',
    width: '250'
  },
  title: {
    align: 'right',
    text: 'Staking Supply'
  },
  tooltip: {
    pointFormat: '<b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  legend: { align: 'right', layout: 'vertical'  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true
    }
  },
  series: [{
    innerSize: '50%',
    type: 'pie',
    name: 'XX',
    colorByPoint: true,
    data: [{
      name: 'Staked',
      color: '#00A2D6',
      y: 58,
      selected: true
    }, {
      name: 'Liquid',
      color: '#6F74FF',
      y: 34
    }, {
      name: 'Unbonding',
      color: '#59BD1C',
      y: 8
    }]
  }]
}

export default (props: HighchartsReact.Props) => <HighchartsReact highcharts={Highcharts} options={options} {...props} />