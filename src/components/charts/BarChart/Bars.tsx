import React, { FC } from 'react';
import { Box } from '@mui/material';

import Bar from './Bar';
import BarDivider from './BarDivider';
import { DIVIDER_WIDTH } from './config';
import { useBarchartContext } from './BarChartContext';

const Bars: FC<{ inverse?: boolean }> = ({ inverse }) => {
  const context = useBarchartContext();
  
  
  const info = inverse ? context.infoB : context.infoA;
  const grouped = info?.grouped;

  return (
    <>
      {grouped?.map(([divider, bars]) => (
        <React.Fragment key={divider}>
          {inverse ? <Box sx={{ flex: `0 0 ${DIVIDER_WIDTH}`}} /> : (
            <BarDivider>
              {divider}
            </BarDivider>
          )}
          {bars.map(([label, value], valueIndex) => (
            <Bar
              active={label === context.selected.value?.[0]}
              onClick={context.selected.makeSetter([label, value])}
              onMouseEnter={context.selected.makeSetter([label, value])}
              key={`${divider}-${label}`}
              percent={value / (info?.maxY ?? 1) * 100}
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
