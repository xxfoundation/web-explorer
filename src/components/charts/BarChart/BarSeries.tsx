import { Box, Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { useBarchartContext } from './BarChartContext';
import Bars from './Bars';
import { LABEL_WIDTH, LEGEND_WIDTH } from './config';
import LegendTicks from './LegendTicks';
import VerticalTextStyled from './VerticalDivider/VerticalText.styled';


const LegendLabelContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: `0 0 ${LABEL_WIDTH}`
});

const LegendTicksContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: `0 0 ${LEGEND_WIDTH}`,
  overflow: 'hidden',
  maxWidth: LEGEND_WIDTH
});

type BarSeriesProps = {
  inverse?: boolean;
};

const BarSeries: FC<BarSeriesProps> = ({ inverse }) => {
  const context = useBarchartContext();
  const info = inverse ? context.infoB : context.infoA;
  
  return (
    <Stack sx={{ mt: inverse ? 0 : 2 }} style={{ flexGrow: 1 }} direction='row'>
      <LegendLabelContainer>
        {info?.label && (
          <VerticalTextStyled variant='subheader4'>
            {info?.label}
          </VerticalTextStyled>
        )}
      </LegendLabelContainer>
      <LegendTicksContainer>
        <LegendTicks
          ticks={info?.ticks ?? []}
          inverse={inverse}
          isCurrency={info?.isCurrency} />
      </LegendTicksContainer>
      <Bars inverse={inverse} />
    </Stack>
  )
}

export default BarSeries;
