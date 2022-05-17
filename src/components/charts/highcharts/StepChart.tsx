import Highcharts, {
  AxisLabelsFormatterCallbackFunction,
  Options,
  TooltipFormatterCallbackFunction
} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC } from 'react';
import { theme } from '../../../themes/default';
import { DataPoint } from '../../../types';

type Props = {
  title?: string;
  data: DataPoint[];
  seriesName: string;
  xName: string;
  yName: string;
  labelFormatters?: {
    xAxis?: AxisLabelsFormatterCallbackFunction;
    yAxis?: AxisLabelsFormatterCallbackFunction;
  };
  tooltipFormatter?: TooltipFormatterCallbackFunction;
};

const StepChart: FC<Props> = ({
  data,
  labelFormatters,
  seriesName,
  title,
  tooltipFormatter,
  xName,
  yName
}) => {
  const options: Options = {
    colors: ['#00C4FF'],
    chart: { zoomType: 'x' },
    credits: { enabled: false },
    legend: { enabled: false },
    tooltip: {
      backgroundColor: theme.palette.grey[600],
      borderWidth: 0,
      enabled: true,
      useHTML: true,
      padding: 10,
      style: {
        color: theme.palette.grey[200]
      },
      formatter: tooltipFormatter
    },
    series: [
      {
        data: data,
        step: 'left',
        type: 'line',
        name: seriesName,
        marker: { symbol: 'circle' }
      }
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          radius: 3
        }
      }
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        style: { color: theme.palette.grey[600] },
        text: yName,
        rotation: 0,
        align: 'low',
        y: 45,
        x: -40
      },
      labels: {
        style: { color: theme.palette.grey[600] },
        align: 'left',
        x: -40,
        formatter: labelFormatters?.yAxis
      },
      offset: 25
    },
    xAxis: {
      title: {
        style: { color: theme.palette.grey[400] },
        text: xName,
        align: 'low',
        x: -74,
        y: -18
      },
      labels: {
        formatter: labelFormatters?.xAxis,
        style: { color: theme.palette.grey[400] },
        y: 30
      },
      crosshair: { dashStyle: 'Solid' },
      offset: 75
    },
    title: { text: title }
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StepChart;
