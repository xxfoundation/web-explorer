import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {AxisTypeValue, SeriesClickEventObject, TooltipFormatterContextObject} from 'highcharts';
import React, { FC, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

import { Timeframe } from '../types';
import LineChart from './LineChart';
import { DataPoint } from './types';

type Props = {
  timeframes: Record<Timeframe, number>;
  timeframe: number;
  data: DataPoint[];
  onChange: ({ target }: SelectChangeEvent<number>) => void;
  onClick?: (evt: SeriesClickEventObject) => void;
  tooltipFormatter?: (this: TooltipFormatterContextObject) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labelFormatters?: any;
  toolTipType?: string;
  yAxisTitle?: string;
  xAxisTitle?: string;
  xAxisType?: AxisTypeValue;
  seriesName?: string;
}

const DropdownTimelineLineChart: FC<Props> = ({
  data,
  labelFormatters,
  onChange,
  onClick,
                                                seriesName,
  timeframe,
  timeframes,
                                                toolTipType,
  tooltipFormatter,
                                                xAxisTitle,
                                                xAxisType,
                                                yAxisTitle,
}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(
    () => {
      setTimeout(() => {
        chartRef.current?.chart.reflow();
      })
    },
    [timeframe]
  );

  return (
  <>
    <Box sx={{ display: 'flex', justifyContent: 'right', pr: 2 }}>
      <FormControl variant='standard'>
        <Select
          labelId='timeframe-label'
          id='timeframe-select'
          value={timeframe}
          label='Timeframe'
          onChange={onChange}
        >
          {Object.entries(timeframes).map(([label, time]) => (
            <MenuItem value={time} key={time}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <LineChart
      chartRef={chartRef}
      data={data}
      onClick={onClick}
      tooltipFormatter={tooltipFormatter}
      labelFormatters={labelFormatters}
      yAxisTitle={yAxisTitle}
      xAxisType={xAxisType}
      toolTipType={toolTipType}
      xAxisTitle={xAxisTitle}
      seriesName={seriesName}
    />
  </>);
};

export default DropdownTimelineLineChart;
