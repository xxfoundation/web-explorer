import React, { FC } from 'react';
import { Box, styled } from '@mui/material';

import VerticalDivider from './VerticalDivider';
import { DIVIDER_WIDTH } from './config';

const DividerContainer = styled(Box)({
  flex: `0 0 ${DIVIDER_WIDTH}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
});

const Divider = styled(VerticalDivider)({
  flexGrow: 1,
  paddingLeft: '0.3rem',
  paddingRight: '0.3rem'
})

const BarDividerBox: FC = ({ children }) => (
  <DividerContainer>
    <Divider>
      {children}
    </Divider>
  </DividerContainer>
)

export default BarDividerBox;
