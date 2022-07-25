import { Box } from '@mui/material';
import Highcharts, {
  AxisLabelsFormatterCallbackFunction as LabelFormatter,
  Options,
  TooltipFormatterCallbackFunction as TooltipFormatter
} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC, useMemo } from 'react';
import { theme } from '../../../themes/footer';
import Error from '../../Error';
import { DataPoint } from './types';

const calculateMaximums = (data: DataPoint[]) => {
  const xItems = data.map(([x]) => x);
  const maxX = Math.max(...xItems);
  const minX = Math.min(...xItems);

  return {
    minX: minX * 0.995,
    maxX: maxX * 1.005
  };
};

type Props = {
  title?: string;
  data: DataPoint[];
  labelFormatters?: {
    xAxis?: LabelFormatter;
    yAxis?: LabelFormatter;
  };
  x?: { maxX: number; minX: number };
  tooltipFormatter?: TooltipFormatter;
};

const LineChart: FC<Props> = ({ data, labelFormatters, title, tooltipFormatter, x }) => {
  const options = useMemo<Options>(() => {
    const { maxX, minX } = x || calculateMaximums(data);
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
          textAlign: 'center',
          style: { fontWeight: 'bolder' }
        },
        labels: { y: 20, formatter: labelFormatters?.xAxis },
        tickWidth: 1,
        // TODO tickPixelInterval: pixelIntervalX, create a parameter to control this better
        offset: 10,
        min: minX,
        max: maxX,
        margin: 50
      },
      yAxis: {
        gridLineWidth: 0,
        title: { text: '' },
        labels: { align: 'right', x: 0, formatter: labelFormatters?.yAxis },
        min: 0
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            radius: 5
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
  }, [data, labelFormatters?.xAxis, labelFormatters?.yAxis, title, tooltipFormatter, x]);

  if (!data.length) {
    return (
      <Box
        sx={{
          height: 'inherit',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Error type='data-unavailable' />
      </Box>
    );
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
