import type { SeriesData, TimeInterval } from './types';

import React, { FC, useMemo } from 'react';
import { Box, Stack, styled } from '@mui/material';

import Bars from './Bars';
import LegendTicks from './LegendTicks';
import VerticalTextStyled from './VerticalDivider/VerticalText.styled';
import { extractInfo } from './utils';
import { LABEL_WIDTH, LEGEND_WIDTH } from './config';

const LegendLabelContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: `0 0 ${LABEL_WIDTH}`
});

const LegendTicksContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: `0 0 ${LEGEND_WIDTH}`
});

type BarSeriesProps = { series: SeriesData, interval: TimeInterval, inverse?: boolean };

const BarSeries: FC<BarSeriesProps> = ({ interval, inverse, series }) => {
  const { label } = series;
  
  const info = useMemo(
    () => extractInfo(series, interval),
    [series, interval]
  );

  return (
    <Stack sx={{ mt: inverse ? 0 : 2 }} style={{ flexGrow: 1 }} direction='row'>
      <LegendLabelContainer>
        {label && (
          <VerticalTextStyled variant='subheader4'>
            {label}
          </VerticalTextStyled>
        )}
      </LegendLabelContainer>
      <LegendTicksContainer>
        <LegendTicks ticks={info.ticks} inverse={inverse}/>
      </LegendTicksContainer>
      <Bars {...info} inverse={inverse} />
    </Stack>
  )
}

export default BarSeries;