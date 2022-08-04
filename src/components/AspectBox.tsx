
import type { BoxProps } from '@mui/material';
import type { WithChildren } from '../types';

import React, { FC } from 'react';
import { styled, Box } from '@mui/material';

const Container = styled(Box)({
  position: 'relative'
});

const Wrapper = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '& > *': { height: '100%', width: '100%' }
})

const Padding = styled('div')<{ ratio: number }>(({ ratio }) => ({
  paddingBottom: (1 / ratio) * 100 + '%'
}));

type AspectProps = WithChildren & BoxProps & { ratio: number };

const AspectBox: FC<AspectProps> = ({ children, ratio = 1, ...rest }) => {
  return (
    <Container {...rest}>
      <Wrapper>{children}</Wrapper>
      <Padding ratio={ratio} />
    </Container>
  );
};

export default AspectBox;