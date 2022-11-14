import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Box, Tooltip } from '@mui/material';
import React, { FC } from 'react';

export type BlockStatus = 'failed' | 'successful' | 'pending';

const statusToIconMap: Record<BlockStatus, React.ReactElement> = {
  failed: (
    <Box component='span' aria-label={'Failed'}>
      <Tooltip title='Failed' arrow>
        <ErrorIcon color='error' />
      </Tooltip>
    </Box>
  ),
  pending: (
    <Box component='span'  aria-label={'Pending'}>
      <Tooltip title='Pending' arrow>
        <ClockIcon color='warning' />
      </Tooltip>
    </Box>
  ),
  successful: (
    <Box component='span'  aria-label={'Successful'}>
      <Tooltip title='Successful' arrow>
        <CheckCircleOutlinedIcon color='success' />
      </Tooltip>
    </Box>
  )
};

const BlockStatusIcon: FC<{ status: BlockStatus }> = ({ status }) => {
  return statusToIconMap[status] || null;
};

export default BlockStatusIcon;
