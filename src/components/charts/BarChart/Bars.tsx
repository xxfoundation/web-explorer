import type { SeriesMetadata } from './types';

import React, { FC, useMemo } from 'react';
import { Box } from '@mui/material';

import Bar from './Bar';
import BarDivider from './BarDivider';
import { groupCountByInterval } from './utils';
import { DIVIDER_WIDTH } from './config';

const Bars: FC<SeriesMetadata & { inverse?: boolean }> = ({ inverse, ...derived }) => {
  const grouped = useMemo(() => groupCountByInterval(derived), [derived]);

  return (
    <>
      {grouped.map(([divider, bars]) => (
        <React.Fragment key={divider}>
          {inverse ? <Box sx={{ flex: `0 0 ${DIVIDER_WIDTH}`}} /> : (
            <BarDivider>
              {divider}
            </BarDivider>
          )}
          {bars.map(([timestamp, value], valueIndex) => (
            <Bar
              key={`${divider}-${timestamp}`}
              percent={value / derived.maxY * 100}
              index={valueIndex}
              inverse={inverse}
              of={bars.length}
            />
          ))}
        </React.Fragment>
      ))}
    </>
  )
};

export default Bars;
