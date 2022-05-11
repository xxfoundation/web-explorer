import type { TimeInterval } from './types';
import React, { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { Box, Stack, styled } from '@mui/material';

import { extractInfo, groupCountByInterval } from './utils';
import { BAR_PADDING, BAR_WIDTH, DIVIDER_WIDTH, LABEL_WIDTH, LEGEND_WIDTH } from './config';

const LabelSpacer = styled(Box)({
  flex: `0 0 ${LABEL_WIDTH}`
});

const UnitLabel = styled(Box)({
  flex: `0 0 ${LEGEND_WIDTH}`
})

const DividerSpacer = styled(Box)({
  flex: `0 0 ${DIVIDER_WIDTH}`,
  height: '1.rem'
});

const IntervalLabel = styled(Box)({
  textAlign: 'center',
  flex: `0 0 ${BAR_WIDTH}`,
  paddingLeft: BAR_PADDING,
  paddingRight: BAR_PADDING
});

const BarIntervalLabels = ({ interval, timestamps }: { timestamps: number[], interval: TimeInterval }) => {
  const unitLabel = interval.includes('h') ? 'HR' : 'DAY';
  
  const info = useMemo(
    () => extractInfo({ timestamps }, interval),
    [timestamps, interval]
  );

  const grouped = useMemo(() => groupCountByInterval(info), [info]);

  const barInfoFormat = interval.includes('h')
    ? 'HH'
    : 'DD';

  const formatter = useCallback(
    (timestamp: string) => dayjs.utc(parseInt(timestamp)).format(barInfoFormat),
    [barInfoFormat]
  );

  return (
    <Stack direction='row'>
      <LabelSpacer />
      <UnitLabel>
        {unitLabel}
      </UnitLabel>
      {grouped.map(([label, counts]) => (
        <React.Fragment key={label}>
          <DividerSpacer />
          {
            counts.map(([t], index) => (
              <IntervalLabel>
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