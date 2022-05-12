import type { SeriesData } from './types';
import React, { FC } from 'react';
import { Box, styled } from '@mui/material';

import { Provider } from './BarChartContext';
import BarSeries from './BarSeries';
import Controls from './Controls';
import BarIntervalLabels from './BarIntervalLabels';
import BarInfoContainer from './BarInfoContainer';

const ChartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'stretch'
});

const hasTwoSeries = (series: SeriesData | [SeriesData, SeriesData]): series is [SeriesData, SeriesData] => Array.isArray(series); 

type BarChartContainerProps = {
  series: SeriesData | [SeriesData, SeriesData];
}
  
const BarChartContainer: FC<BarChartContainerProps> = ({ series }) => {
  const hasTwo = hasTwoSeries(series);
  const seriesA = hasTwo ? series[0] : series;
  const seriesB = hasTwo ? series[1] : undefined;
  const timestamps = !seriesB?.timestamps
    || (seriesA.timestamps.length > (seriesB.timestamps.length ?? 0))
    ? seriesA.timestamps
    : seriesB?.timestamps;

  return (
    <Provider timestamps={timestamps} seriesA={seriesA} seriesB={seriesB}>
      <Box>
        <Controls />
        <ChartContainer sx={{ minHeight: hasTwo ? '22rem' : '16rem' }}>
          <BarSeries />
          <BarIntervalLabels />
          {seriesB ? (
            <BarSeries inverse={true} />
          ) : (
            <Box sx={{ pb: hasTwo ? 10 : 0 }} />
          )}
          <BarInfoContainer />
        </ChartContainer>
      </Box>
    </Provider>
  )
};

export default BarChartContainer;
