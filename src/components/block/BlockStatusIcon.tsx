import ClockIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Box } from '@mui/material';
import React, { FC } from 'react';

export type BlockStatus = 'failed' | 'successful' | 'pending'

const statusToIconMap: Record<BlockStatus, React.ReactElement> = {
  failed: (
    <Box aria-label={'Failed'}>
      <ErrorIcon color='error' />
    </Box>
  ),
  pending: (
    <Box aria-label={'Pending'}>
      <ClockIcon color='warning' />
    </Box>
  ),
  successful: (
    <Box aria-label={'Successful'}>
      <CheckCircleOutlinedIcon color='success' />
    </Box>
  )
};

const BlockStatusIcon: FC<{ status: BlockStatus }> = ({
  status,
}) => {
  return statusToIconMap[status] || null;
};

export default BlockStatusIcon;
