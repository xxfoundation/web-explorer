import type { WithChildren } from '../types';

import React, { FC } from 'react';
import { Divider, Stack, Tooltip } from '@mui/material';

import CopyButton from './buttons/CopyButton';
import Ellipsis from './Ellipsis';

type Props = WithChildren & { value: string, tooltip?: boolean };

export const WithCopy: FC<Props> = ({ children, tooltip, value }) => (
  <Stack direction='row' flexWrap='nowrap' alignItems='center'>
    {tooltip ? (
      <Tooltip title={value} arrow placement='top'>
        <Ellipsis>{children}</Ellipsis>
      </Tooltip>
    ) : (
      <Ellipsis>{children}</Ellipsis>
    )}
    <Divider orientation='vertical' sx={{ mr: 2, ml: 2, height: 19, display: 'inline-block' }} />
    <CopyButton style={{ display: 'inline-block' }} value={value} />
  </Stack>
);

export default WithCopy;
