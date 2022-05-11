import type { SeriesMetadata } from './types';

import React, { FC, useMemo } from 'react';

import Bar from './Bar';
import BarDivider from './BarDivider';
import { groupCountByInterval } from './utils';

const Bars: FC<SeriesMetadata> = (derived) => {
  const grouped = useMemo(() => groupCountByInterval(derived), [derived]);

  return (
    <>
      {grouped.map(([divider, bars]) => (
        <>
          <BarDivider
            key={divider}
          >
            {divider}
          </BarDivider>
          {bars.map(([timestamp, value], valueIndex) => (
            <Bar
              key={`${divider}-${timestamp}`}
              percent={value / derived.maxY * 100}
              index={valueIndex}
              of={bars.length}
            />
          ))}
        </>
      ))}
    </>
  )
};

export default Bars;
