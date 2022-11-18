import { Box } from '@mui/material';
import Highcharts, {
  SeriesClickEventObject,
  AxisLabelsFormatterCallbackFunction as LabelFormatter,
  Options,
  TooltipFormatterCallbackFunction as TooltipFormatter
} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC,useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
  chartRef?: React.Ref<HighchartsReact.RefObject>;
  title?: string;
  onClick?: (evt: SeriesClickEventObject) => void;
  yAxisTitle?: string;
  data: DataPoint[];
  labelFormatters?: {
    xAxis?: LabelFormatter;
    yAxis?: LabelFormatter;
  };
  x?: { maxX: number; minX: number };
  tooltipFormatter?: TooltipFormatter;
};


const LineChart: FC<Props> = ({
  chartRef,
  data,
  labelFormatters,
  onClick,
  title,
  tooltipFormatter,
  x,
  yAxisTitle = ''
}) => {
  const { t } = useTranslation();
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
          text: t('ERA') ?? '',
          align: 'low',
          textAlign: 'center',
          style: { fontWeight: 'bolder' }
        },
        labels: { y: 20, formatter: labelFormatters?.xAxis },
        tickWidth: 1,
        offset: 10,
        min: minX,
        max: maxX,
        margin: 50
      },
      yAxis: {
        gridLineWidth: 0,
        title: { text: yAxisTitle },
        labels: { align: 'right', x: 0, formatter: labelFormatters?.yAxis },
        min: 0
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          marker: {
            enabled: true,
            radius: 5
          }
        }
      },
      series: [
        {
          events: {
            click: onClick,
          },
          type: 'line',
          name: t('ERA') ?? '',
          marker: { symbol: 'circle' },
          data
        }
      ]
    };
  }, [
    t,
    data,
    labelFormatters?.xAxis,
    labelFormatters?.yAxis,
    onClick,
    title,
    tooltipFormatter,
    x,
    yAxisTitle
  ]);

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
  return (
    <HighchartsReact
      ref={chartRef}
      highcharts={Highcharts}
      options={options} />
  );
};

export default LineChart;
