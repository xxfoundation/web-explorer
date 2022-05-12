import { Box, styled } from '@mui/material';
import { BAR_PADDING, BAR_WIDTH, DIVIDER_WIDTH, LABEL_WIDTH, LEGEND_WIDTH } from './config';

export const LabelSpacer = styled(Box)({
  flex: `0 0 ${LABEL_WIDTH}`
});

export const LegendSpacer = styled(Box)({
  flex: `0 0 ${LEGEND_WIDTH}`,
});

export const DividerSpacer = styled(Box)({
  flex: `0 0 ${DIVIDER_WIDTH}`,
});

export const BarSpacer = styled(Box)({
  flex: `0 0 ${BAR_WIDTH}`,
  paddingLeft: BAR_PADDING,
  paddingRight: BAR_PADDING
})