import React, { FC, useMemo, useState } from 'react';
import { styled, Stack, Box, BoxProps, Typography } from '@mui/material';
import { groupBy } from 'lodash';
import dayjs from 'dayjs';
import Legend from './Legend';
import VerticalDivider from './VerticalDivider';
import Controls, { intervalToMilli, TimeInterval } from './Controls';
import Bar from './Bar';
import VerticalTextStyled from './VerticalDivider/VerticalText.styled';

const NUMBER_OF_TICKS = 3;

const ChartContainer = styled('div')({
  minHeight: '18rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'stretch'
});

const DividerBox: FC<BoxProps> = ({ children, ...rest }) => (
  <Box {...rest} style={{ display: 'flex', flexDirection: 'column' }}>
    <VerticalDivider style={{ flexGrow: 1, paddingLeft: '0.3rem', paddingRight: '0.3rem' }}>{children}</VerticalDivider>
    <Box sx={{ mt: 1 }} style={{ height: '1rem' }}/>
  </Box>
)

const BarInfo: FC<{ count: number, timestamp: string, timeFormat?: string }> = ({ count, timeFormat = 'YYYY.MM.DD', timestamp }) => {
  const formatted = useMemo(() => dayjs.utc(parseInt(timestamp, 10)).format(timeFormat), [timestamp, timeFormat])

  return <>
    <Typography variant='body4' style={{ whiteSpace: 'nowrap' }}>
      {formatted}
    </Typography>
    <br />
    <Typography
      sx={{ color: 'primary.dark' }}
      variant='body4'
      style={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{count} extrinsic{count > 1 ? 's' : ''}</Typography>
  </>
}

type TimestampCounts = Record<number, number>;

const convertToNearestTimestamp = (timestamp: number, interval: TimeInterval) => {
  const intervalMillis = intervalToMilli[interval];
  return intervalMillis * Math.floor(timestamp / intervalMillis);
}

const toNearestCeiling = (number: number, tickSize: number) => tickSize * Math.ceil(number / tickSize);
const getMagnitude = (x: number) => Math.floor( Math.log10(x) + 1);

const getCountsByTimestamp = (
  timestamps: Props['timestamps'],
  interval: TimeInterval = '1h'
) => timestamps.reduce(
  (acc, timestamp) => {
    const nearest = convertToNearestTimestamp(timestamp, interval);
    
    return {
      ...acc,
      [nearest]: (acc[nearest] ?? 0) + 1
    };
  },
  {} as TimestampCounts
);

const byDay = ([timestamp]: [string, number]) => {
  const date = dayjs.utc(parseInt(timestamp));
  // eslint-disable-next-line no-console
  return dayjs().utc().day() === date.day() ? 'Today' : date.format('YYYY.MM.DD');
}

const byMonth = ([timestamp]: [string, number]) => {
  const date = dayjs.utc(parseInt(timestamp));
  return dayjs().utc().month() === date.month() ? 'This month' : date.format('YYYY.MM');
}

const calculateTickSize = (max: number) => {
  const perTick = max / NUMBER_OF_TICKS;
  const magnitude = getMagnitude(perTick) - 1;
  const power = Math.pow(10, magnitude);
  return toNearestCeiling(perTick, power);
}

const renderBars = (counts: TimestampCounts, interval: TimeInterval, max: number): React.ReactNode[] => {
  const grouped = groupBy(Object.entries(counts), interval.includes('h') ? byDay : byMonth);
  const barLabelFormat = interval.includes('h')
    ? 'HH'
    : 'DD'
  const barInfoFormat = interval.includes('h')
    ? 'YYYY.MM.DD | HH:mm (Z)'
    : 'YYYY.MM.DD';

  return Object.entries(grouped).reduce(
    (acc, [divider, bars], index) => {
      acc.push(<DividerBox key={divider} sx={{ ml: index === 0 ? 0 : 2 }}>{divider}</DividerBox>);

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

type Props = {
  timestamps: number[];
}

const BarChart: FC<Props> = ({ timestamps }) => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const counts = useMemo(() => getCountsByTimestamp(timestamps, interval), [interval, timestamps]);
  const maxY = useMemo(() => Math.max(...Object.values(counts)), [counts]);
  const tickSize = useMemo(() => calculateTickSize(maxY), [maxY]);
  const ticks = useMemo(() => Array.from(Array(NUMBER_OF_TICKS).keys()).map((i) => (i + 1) * tickSize), [tickSize]);
  const maxTick = Math.max(...ticks);
  const bars = useMemo(() => renderBars(counts, interval, maxTick), [counts, interval, maxTick])
  
  return (
    <>
      <Controls selected={interval} onSelect={setInterval} />
      <ChartContainer>
        <Stack sx={{ mt:2 }} style={{ flexGrow: 1 }} direction='row'>
          <Box sx={{ p: 1.5 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <VerticalTextStyled variant='body3' style={{ textTransform: 'uppercase' }}>
              Extrinsincs
            </VerticalTextStyled>
            <Box sx={{ mt: 1, height: '1rem' }} />
          </Box>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Legend style={{ flexGrow: 1 }} ticks={ticks} />
            <Box sx={{ mt: 1, height: '1rem' }}>
              <Typography variant='body3' sx={{ color: 'grey.400' }}>
                {interval.includes('h') ? 'HRS' : 'DAYS'}
              </Typography>
            </Box>
          </div>
          {bars}
        </Stack>
        <Box sx={{ pb: 10 }} />
      </ChartContainer>
    </>
  )
};

export default BarChart;