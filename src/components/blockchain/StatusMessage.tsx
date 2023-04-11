import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Box, Tooltip, Typography } from '@mui/material';
import { upperFirst } from 'lodash';
import React, { FC } from 'react';

export type Status = 'failed' | 'successful' | 'pending';

const statusToIconMap: Record<Status, React.ReactElement> = {
  failed: <ErrorIcon color='error' />,
  pending: <ClockIcon color='warning' />,
  successful: <CheckCircleIcon color='success' />
};

function statusMap(status: Status, message?: string): React.ReactElement {
  return (
    <Box component='span' sx={{ display: 'flex' }} aria-label={status}>
      <Tooltip title={message || ''} arrow>
        {statusToIconMap[status]}
      </Tooltip>
      <Typography sx={{ fontWeight: 'normal', pl: '0.3em', alignSelf: 'center' }}>
        {upperFirst(status)}
      </Typography>
    </Box>
  );
}

const StatusMessage: FC<{ status: Status; message?: string }> = ({ message, status }) => {
  return statusMap(status, message) || null;
};

export default StatusMessage;
