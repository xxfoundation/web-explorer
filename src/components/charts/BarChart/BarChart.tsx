import { Box, styled } from '@mui/material';
import React, { FC } from 'react';
import { Provider } from './BarChartContext';
import BarInfoContainer from './BarInfoContainer';
import BarIntervalLabels from './BarIntervalLabels';
import BarSeries from './BarSeries';
import type { SeriesData, TimeInterval } from './types';

const ChartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'stretch'
});

const hasTwoSeries = (
  series: SeriesData | [SeriesData, SeriesData]
): series is [SeriesData, SeriesData] => Array.isArray(series);

type BarChartContainerProps = {
  series: SeriesData | [SeriesData, SeriesData];
  interval: TimeInterval;
};

const BarChartContainer: FC<BarChartContainerProps> = ({ interval, series }) => {
  const hasTwo = hasTwoSeries(series);
  const seriesA = hasTwo ? series[0] : series;
  const seriesB = hasTwo ? series[1] : undefined;
  const timestamps =
    !seriesB?.timestamps || seriesA.timestamps.length > (seriesB.timestamps.length ?? 0)
      ? seriesA.timestamps
      : seriesB?.timestamps;

  return (
    <Provider seriesA={seriesA} seriesB={seriesB} timestamps={timestamps} interval={interval}>
      <>
        <ChartContainer sx={{ minHeight: hasTwo ? '22rem' : '16rem' }}>
          <BarSeries />
          <BarIntervalLabels />
          {seriesB ? <BarSeries inverse={true} /> : <Box sx={{ pb: hasTwo ? 10 : 0 }} />}
          <BarInfoContainer />
        </ChartContainer>
      </>
    </Provider>
  );
};

export default BarChartContainer;
