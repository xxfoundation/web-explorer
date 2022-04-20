import type { TimestampCounts, TimeInterval } from './types';
import React, { FC, useMemo, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { groupBy } from 'lodash';
import dayjs from 'dayjs';

import Bar from './Bar';
import ChartContainer from './BarChartContainer.styled';
import Controls  from './Controls';
import Legend from './Legend';
import BarDivider from './BarDividerBox';
import BarInfo from './BarInfo';
import VerticalTextStyled from './VerticalDivider/VerticalText.styled';
import { calculateTickSize, getCountsByTimestamp, byDay, byMonth } from './utils';

export const renderBars = (counts: TimestampCounts, interval: TimeInterval, max: number): React.ReactNode[] => {
  const entries = Object.entries(counts);
  const intervalGroup = interval.includes('h') ? byDay : byMonth;
  const grouped = groupBy(entries, intervalGroup);
  const barLabelFormat = interval.includes('h')
    ? 'HH'
    : 'DD'
  const barInfoFormat = interval.includes('h')
    ? 'YYYY.MM.DD | HH:mm (Z)'
    : 'YYYY.MM.DD';

  return Object.entries(grouped).reduce(
    (acc, [divider, bars], index) => {
      acc.push(
      <BarDivider key={divider} sx={{ ml: index === 0 ? 0 : 2 }}>
        {divider}
      </BarDivider>
    );

      bars.forEach(([timestamp, value], valueIndex) => {
        const date = dayjs.utc(parseInt(timestamp));
        acc.push(
          <Bar
            key={`${divider}-${timestamp}`}
            percent={value / max * 100}
            index={valueIndex}
            of={bars.length}
            infoLabel={
              <BarInfo
                count={value}
                timeFormat={barInfoFormat}
                timestamp={timestamp}
              />
            }
            >
            {date.format(barLabelFormat)}
          </Bar>
        );
      });

      return acc;
    },
    [] as React.ReactNode[]
  );
}

const NUMBER_OF_TICKS = 3;

type Props = {
  timestamps: number[];
}

const BarChart: FC<Props> = ({ timestamps }) => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const counts = useMemo(() => getCountsByTimestamp(timestamps, interval), [interval, timestamps]);
  const maxY = useMemo(() => Math.max(...Object.values(counts)), [counts]);
  const tickSize = useMemo(() => calculateTickSize(maxY, NUMBER_OF_TICKS), [maxY]);
  const ticks = useMemo(() => Array.from(Array(NUMBER_OF_TICKS).keys()).map((i) => (i + 1) * tickSize), [tickSize]);
  const maxTick = Math.max(...ticks);
  const bars = useMemo(() => renderBars(counts, interval, maxTick), [counts, interval, maxTick])
  
  return (
    <Box>
      <Controls selected={interval} onSelect={setInterval} />
      <ChartContainer>
        <Stack sx={{ mt:2 }} style={{ flexGrow: 1 }} direction='row'>
          <Box sx={{ p: 1.5 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <VerticalTextStyled variant='subheader4'>
              Extrinsincs
            </VerticalTextStyled>
            <Box sx={{ mt: 1, height: '1rem' }} />
          </Box>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Legend style={{ flexGrow: 1 }} ticks={ticks} />
            <Box sx={{ mt: 1, height: '1rem' }}>
              <Typography variant='subheader4' sx={{ fontWeight: 500 }}>
                {interval.includes('h') ? 'HR' : 'DAY'}
              </Typography>
            </Box>
          </div>
          {bars}
        </Stack>
        <Box sx={{ pb: 10 }} />
      </ChartContainer>
    </Box>
  )
};

export default BarChart;
