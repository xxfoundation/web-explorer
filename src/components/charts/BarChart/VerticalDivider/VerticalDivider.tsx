import { FC } from 'react';
import { styled, Box } from '@mui/material';
import React from 'react';

import VerticalText from './VerticalText.styled';
import Divider from './Divider';

const VerticalDividerContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1rem;
`;


const Text = styled(VerticalText)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.grey[400],
}));

const VerticalDivider: FC<JSX.IntrinsicElements['div']> = ({ children, ...props }) => (
  <VerticalDividerContainer {...props}>
    <Divider />
    <Box>
      <Text>
        {children}
      </Text>
    </Box>
  </VerticalDividerContainer>
);

export default VerticalDivider;
