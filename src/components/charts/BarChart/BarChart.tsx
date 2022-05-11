import type { TimeInterval, SeriesData } from './types';
import React, { FC, useState } from 'react';
import {  Box } from '@mui/material';

import ChartContainer from './BarChartContainer.styled';
import BarSeries from './BarSeries';
import Controls from './Controls';
import BarIntervalLabels from './BarIntervalLabels';

const hasTwoSeries = (series: SeriesData | [SeriesData, SeriesData]): series is [SeriesData, SeriesData] => Array.isArray(series); 

type BarChartContainerProps = {
  series: SeriesData | [SeriesData, SeriesData];
}
  
const BarChartContainer: FC<BarChartContainerProps> = ({ series }) => {
  const seriesA = hasTwoSeries(series) ? series[0] : series;
  const seriesB = hasTwoSeries(series) ? series[1] : undefined;
  const timestamps = !seriesB?.timestamps
    || (seriesA.timestamps.length > (seriesB.timestamps.length ?? 0))
    ? seriesA.timestamps
    : seriesB?.timestamps;
  const [interval, setInterval] = useState<TimeInterval>('1h');

  return (
    <Box>
      <Controls selected={interval} onSelect={setInterval} />
      <ChartContainer>
        <BarSeries
          interval={interval}
          series={seriesA}
        />
        <BarIntervalLabels interval={interval} timestamps={timestamps} />
        {seriesB ? (
          <BarSeries
            interval={interval}
            series={seriesB}
            inverse={true}
          />
        ) : (
          <Box sx={{ pb: 10 }} />
        )}
      </ChartContainer>
    </Box>
  )
};

export default BarChartContainer;
