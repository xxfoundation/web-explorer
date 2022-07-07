import React, { FC } from 'react';
import { Divider, Stack } from '@mui/material';

import CopyButton from './buttons/CopyButton';
import Ellipsis from './Ellipsis';

const WithCopy: FC<{ value: string }> = ({ children, value }) => (
  <Stack direction='row' flexWrap='nowrap' alignItems='center'>
    <Ellipsis>{children}</Ellipsis>
    <Divider orientation='vertical' sx={{ mr: 2, ml: 2, height: 19, display: 'inline-block' }} />
    <CopyButton style={{ display: 'inline-block' }} value={value} />
  </Stack>
);

export default WithCopy;
