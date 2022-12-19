import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Box, Tooltip } from '@mui/material';
import React, { FC } from 'react';

export type BlockStatus = 'failed' | 'successful' | 'pending';

const statusToIconMap: Record<BlockStatus, React.ReactElement> = {
  failed: (
    <ErrorIcon color='error' />
  ),
  pending: (
    <ClockIcon color='warning' />
  ),
  successful: (
    <CheckCircleOutlinedIcon color='success' />
  )
};

function statusMap(status: BlockStatus, message?: string): React.ReactElement {
  return (
    <Box component='span'  aria-label={status}>
      <Tooltip title={message ? status + '\n' + message : status} arrow>
        {statusToIconMap[status]}
      </Tooltip>
    </Box>
  );
}

const BlockStatusIcon: FC<{ status: BlockStatus, message?: string }> = ({ message, status }) => {
  return statusMap(status, message) || null;
};

export default BlockStatusIcon;
