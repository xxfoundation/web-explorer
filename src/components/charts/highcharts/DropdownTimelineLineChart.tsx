import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SeriesClickEventObject, TooltipFormatterContextObject } from 'highcharts';
import React, { FC, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';

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
}

const DropdownTimelineLineChart: FC<Props> = ({
  data,
  labelFormatters,
  onChange,
  onClick,
  timeframe,
  timeframes,
  tooltipFormatter
}) => {
  const { t } = useTranslation();
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
          label={t('Timeframe')}
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
    />
  </>);
};

export default DropdownTimelineLineChart;
