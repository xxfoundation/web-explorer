import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SeriesClickEventObject, TooltipFormatterContextObject } from 'highcharts';
import React, { FC } from 'react';
import LineChart from './LineChart';
import { DataPoint } from './types';

type Props = {
  timeframes: Record<string, number>;
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
      data={data}
      onClick={onClick}
      tooltipFormatter={tooltipFormatter}
      labelFormatters={labelFormatters}
    />
  </>);
};

export default DropdownTimelineLineChart;
