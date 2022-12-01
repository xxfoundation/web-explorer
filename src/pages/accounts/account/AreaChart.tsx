import React, { FC } from 'react';
import Highcharts, {
  AxisLabelsFormatterCallbackFunction,
  Options,
  TooltipFormatterCallbackFunction,
  SeriesOptionsType
} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '@mui/material';

type Props = {
  title?: string;
  series: SeriesOptionsType[];
  xName?: string;
  yName?: string;
  labelFormatters?: {
    xAxis?: AxisLabelsFormatterCallbackFunction;
    yAxis?: AxisLabelsFormatterCallbackFunction;
  };
  tooltipFormatter?: TooltipFormatterCallbackFunction;
};

const StepChart: FC<Props> = ({
  labelFormatters,
  series,
  title,
  tooltipFormatter,
  xName,
  yName
}) => {
  const theme = useTheme();
  const options: Options = {
    colors: ['#00C4FF'],
    chart: { type: 'area', marginLeft: 50, zooming: {type: 'x'} },
    credits: { enabled: false },
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
    series,
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          radius: 3
        }
      },
      area: {
        stacking: 'normal',
      }
    },
    yAxis: {
      gridLineWidth: 0,
      tickWidth: 1,
      tickLength: 4,
      title: {
        style: { fontWeight: 'bold', color: theme.palette.grey[600] },
        text: yName,
        rotation: 0,
        align: 'high',
        y: 0,
        x: -20
      },
      labels: {
        style: { color: theme.palette.grey[600], width: 50 },
        align: 'left',
        x: -45,
        formatter: labelFormatters?.yAxis,
      },
      offset: 5
    },
    xAxis: {
      title: {
        style: { fontWeight: 'bold', color: theme.palette.grey[400] },
        text: xName,
        align: 'low',
        x: -50,
        y: -19
      },
      labels: {
        formatter: labelFormatters?.xAxis,
        style: { color: theme.palette.grey[400] },
        y: 30
      },
      crosshair: { dashStyle: 'Solid' },
      offset: 45
    },
    title: { text: title }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StepChart;
