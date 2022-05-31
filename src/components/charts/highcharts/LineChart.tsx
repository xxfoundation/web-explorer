import Highcharts, {
  AxisLabelsFormatterCallbackFunction as LabelFormatter,
  Options,
  TooltipFormatterCallbackFunction as TooltipFormatter
} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC, useMemo } from 'react';
import { theme } from '../../../themes/footer';
import { DataPoint } from './types';

const calculateMaximums = (data: DataPoint[]) => {
  const xItems = data.map(([x]) => x);
  // const yItems = data.map(([, y]) => y);
  const maxX = Math.max(...xItems);
  const minX = Math.min(...xItems);

  return {
    minX: minX * 0.9,
    maxX: maxX * 1.1
  };
};

type Props = {
  title?: string;
  data: DataPoint[];
  labelFormatters?: {
    xAxis?: LabelFormatter;
    yAxis?: LabelFormatter;
  };
  tooltipFormatter?: TooltipFormatter;
};

const LineChart: FC<Props> = ({ data, labelFormatters, title, tooltipFormatter }) => {
  const options = useMemo<Options>(() => {
    const { maxX, minX } = calculateMaximums(data);
    return {
      title: {
        text: title,
        align: 'left',
        style: {
          fontWeight: 'bold'
        }
      },
      colors: ['#00C4FF'],
      tooltip: {
        backgroundColor: theme.palette.grey[600],
        borderWidth: 0,
        borderRadius: 10,
        enabled: true,
        useHTML: true,
        padding: 10,
        style: {
          color: '#fff'
        },
        formatter: tooltipFormatter
      },
      credits: { enabled: false },
      legend: { enabled: false },
      xAxis: {
        title: {
          text: 'ERA',
          align: 'low',
          textAlign: 'left',
          margin: -14,
          style: { fontWeight: 'bolder' }
        },
        labels: { y: 20, formatter: labelFormatters?.xAxis },
        tickWidth: 1,
        // TODO tickPixelInterval: pixelIntervalX, create a parameter to control this better
        offset: 20,
        min: minX,
        max: maxX,
        margin: 50
      },
      yAxis: {
        gridLineWidth: 0,
        title: { text: '' },
        labels: { align: 'right', x: 20, formatter: labelFormatters?.yAxis },
        min: 0,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            radius: 6
          }
        }
      },
      series: [
        {
          type: 'line',
          name: 'ERA',
          marker: { symbol: 'circle' },
          data
        }
      ]
    };
  }, [data, labelFormatters, title, tooltipFormatter]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
