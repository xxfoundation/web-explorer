import { Box, Stack, styled } from '@mui/material';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import type { Theme } from '../../../themes/types';
import { useBarchartContext } from './BarChartContext';
import { BAR_PADDING, BAR_WIDTH, LEGEND_WIDTH } from './config';
import { DividerSpacer, LabelSpacer } from './spacers';

const typography = (theme: Theme) => ({
  fontSize: 12,
  fontWeight: 400,
  color: theme.palette.grey[400],
})

const UnitLabel = styled(Box)(({ theme }) => ({
  ...typography(theme),
  flex: `0 0 ${LEGEND_WIDTH}`
}))

const IntervalLabel = styled(Box)(({ theme }) => ({
  ...typography(theme),
  textAlign: 'center',
  flex: `0 0 ${BAR_WIDTH}`,
  paddingLeft: BAR_PADDING,
  paddingRight: BAR_PADDING
}));

const BarIntervalLabels = () => {
  const context = useBarchartContext();
  const { interval } = context;
  const unitLabel = interval.toLowerCase().includes('h') ? 'HRS' : 'DAY';

  const barInfoFormat = interval.includes('h')
    ? 'HH'
    : 'DD';

  const formatter = useCallback(
    (timestamp: string) => dayjs.utc(parseInt(timestamp)).format(barInfoFormat),
    [barInfoFormat]
  );

  return (
    <Stack direction='row' sx={{ mt: 1, mb: 1 }}>
      <LabelSpacer />
      <UnitLabel>
        {unitLabel}
      </UnitLabel>
      {context.infoA?.grouped.map(([label, counts]) => (
        <React.Fragment key={label}>
          <DividerSpacer />
          {
            counts.map(([t], index) => (
              <IntervalLabel
                key={t}
                onMouseEnter={context.timestamp.makeSetter(t)}>
                {index % 2 === 1 ? formatter(t) : null}
              </IntervalLabel>
            ))
          }
        </React.Fragment>
      ))}
    </Stack>
  )
};

export default BarIntervalLabels;
