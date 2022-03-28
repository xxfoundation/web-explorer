import React, { FC, useMemo } from 'react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';

import { DataPoint } from '../../../types';

type Props = {
  title?: string;
  data: DataPoint[];
}

const LineChart: FC<Props> = ({ data, title  }) => {
  const options = useMemo<EChartsOption>(() => ({
    title: { text: title },
    legend: { show: false },
    animation: false,
    grid: {},
    tooltip: {
      show: true,
      backgroundColor: '#4F4F4F',
      borderWidth: 0,
      textStyle: { color: '#fff' },
      formatter: (
        {
          data: [x, y],
          seriesName
        }: {
          data: [number, number],
          seriesName?: string
        }
      ) => `<b>${seriesName ?? ''} ${x}</b><br /> ${y}`
    },
    xAxis: {
      axisTick: {
        show: true,
        length: 10
      },
      axisLine: {
        show: true,
        onZero: false
      },
      splitLine: { show: false },
      name: 'ERA',
      nameLocation: 'start',
      nameTextStyle: {
        fontWeight: 'bolder',
        align: 'left',
        verticalAlign: 'bottom'
      },
      boundaryGap: ['3%', '3%'],
      offset: 10
    },
    yAxis: {
      axisLine: {
        show: false,
        onZero: true
      },
      splitLine: { show: false },
      axisTick: { show: false },
      offset: -30
    },
    series: [
      {
        type: 'line',
        symbol: 'circle',
        name: 'ERA',
        symbolSize: 10,
        labelLine: { show: false },
        itemStyle: {
          color: '#00C4FF'
        },
        data
      }
    ]
  }), [title, data]);

  return (
    <ReactECharts option={options} />
  )
}

export default LineChart;