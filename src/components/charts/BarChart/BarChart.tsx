import type { TimestampCounts, TimeInterval } from './types';
import React, { FC, useMemo, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Dictionary, groupBy } from 'lodash';
import dayjs from 'dayjs';

import Bar from './Bar';
import ChartContainer from './BarChartContainer.styled';
import Controls from './Controls';
import Legend from './Legend';
import BarDivider from './BarDividerBox';
import BarInfo from './BarInfo';
import VerticalTextStyled from './VerticalDivider/VerticalText.styled';
import { calculateTickSize, getCountsByTimestamp, byDay, byMonth } from './utils';

const dividerWidth = '2.5rem';
const barWidth = '1rem';
const legendWidth = '2rem';
const labelWidth = '2rem';

type SeriesInfo = {
  counts: TimestampCounts;
  maxY: number;
  tickSize: number;
  ticks: number[];
  maxTick: number;
}

type SeriesData = {
  timestamps: number[];
  label?: string;
}

type LabelledSeries = Dictionary<[string, number]>[];

export const renderBars = ({ info, interval }: { info: SeriesInfo, interval: TimeInterval }): React.ReactNode[] => {
  const entries = Object.entries(info.counts);
  const intervalGroup = interval.includes('h') ? byDay : byMonth;
  const grouped = groupBy(entries, intervalGroup);

  return Object.entries(grouped).reduce(
    (acc, [divider, bars]) => {
      acc.push(
        <BarDivider
          style={{ flex: `0 0 ${dividerWidth}`}}
          key={divider}
        >
          {divider}
        </BarDivider>
      );

      bars.forEach(([timestamp, value], valueIndex) => {
        acc.push(
          <Bar
            style={{ flex: `0 0 ${barWidth}`}}
            key={`${divider}-${timestamp}`}
            percent={value / info.maxY * 100}
            index={valueIndex}
            of={bars.length}
          />
        );
      });

      return acc;
    },
    [] as React.ReactNode[]
  );
}

const NUMBER_OF_TICKS = 3;

const extractInfo = ({ timestamps }: SeriesData, interval: TimeInterval) => {
  const counts = getCountsByTimestamp(timestamps, interval);
  const maxY = Math.max(...Object.values(counts));
  const tickSize = calculateTickSize(maxY, NUMBER_OF_TICKS);
  const ticks = Array.from(Array(NUMBER_OF_TICKS).keys()).map((i) => (i + 1) * tickSize);
  const maxTick = Math.max(...ticks);

  return {
    counts,
    maxY,
    tickSize,
    ticks,
    maxTick
  }
}

const hasTwoSeries = (series: SeriesData | [SeriesData, SeriesData]): series is [SeriesData, SeriesData] => Array.isArray(series); 

type BarSeriesProps = { series: SeriesData, interval: TimeInterval, inverse?: boolean };

const BarSeries: FC<BarSeriesProps> = ({ interval, series }) => {
  const { label } = series;
  
  const info = useMemo(
    () => extractInfo(series, interval),
    [series, interval]
  );

  return (
    <Stack sx={{ mt: 2 }} style={{ flexGrow: 1 }} direction='row'>
      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: `0 0 ${labelWidth}` }}>
        {label && (
          <VerticalTextStyled variant='subheader4'>
            {label}
          </VerticalTextStyled>
        )}
      </Box>
      <div style={{ display: 'flex', flexDirection: 'column', flex: `0 0 ${legendWidth}` }}>
        <Legend style={{ flexGrow: 1 }} ticks={info.ticks} />
      </div>
      {renderBars({ info, interval })}
    </Stack>
  )
}

const IntervalLabels = ({ interval, timestamps }: { timestamps: number[], interval: TimeInterval }) => {
  const unitLabel = interval.includes('h') ? 'HR' : 'DAY';
  
  const info = useMemo(
    () => extractInfo({ timestamps }, interval),
    [timestamps, interval]
  );

  return (
    <Stack direction='row'>
      <Box style={{ flex: `0 0 ${legendWidth}`, paddingLeft: labelWidth, height: '1.rem'}}>
        {unitLabel}
      </Box>
    </Stack>
  )
};

type BarChartContainerProps = {
  series: SeriesData | [SeriesData, SeriesData];
}
  
const BarChartContainer: FC<BarChartContainerProps> = ({ series }) => {
  const seriesA = hasTwoSeries(series) ? series[0] : series;
  const seriesB = hasTwoSeries(series) ? series[1] : undefined;

  const [interval, setInterval] = useState<TimeInterval>('1h');

  const barInfoFormat = interval.includes('h')
    ? 'YYYY.MM.DD | HH:mm (Z)'
    : 'YYYY.MM.DD';

  return (
    <Box>
      <Controls selected={interval} onSelect={setInterval} />
      <ChartContainer>
        <BarSeries
          interval={interval}
          series={seriesA}
        />
        <IntervalLabels interval={interval} timestamps={seriesA.timestamps} />
        {seriesB ? (
          <BarSeries
            interval={interval}
            series={seriesB}
            inverse
          />
        ) : (
          <Box sx={{ pb: 10 }} />
        )}
      </ChartContainer>
    </Box>
  )
};

export default BarChartContainer;
