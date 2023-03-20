import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Tooltip } from '@mui/material';
import React, { FC } from 'react';

export type BlockStatus = 'failed' | 'successful' | 'pending';

const statusToIconMap: Record<BlockStatus, React.ReactElement> = {
  failed: <ErrorIcon color='error' />,
  pending: <ClockIcon color='warning' />,
  successful: <CheckCircleIcon color='success' />
};

function statusMap(status: BlockStatus, message?: string): React.ReactElement {
  return (
    <Box component='span' aria-label={status}>
      <Tooltip title={message ? status + '\n' + message : status} arrow>
        {statusToIconMap[status]}
      </Tooltip>
    </Box>
  );
}

const BlockStatusIcon: FC<{ status: BlockStatus; message?: string }> = ({ message, status }) => {
  return statusMap(status, message) || null;
};

export default BlockStatusIcon;
