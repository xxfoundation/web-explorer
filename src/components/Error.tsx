import React, { FC } from 'react';
import { Typography } from '@mui/material';

type ErrorType = 'data-unavailable' | 'general';

const messages: Record<ErrorType, string> = {
  'data-unavailable': 'Data unavailable...',
  'general': 'Something went wrong...'
}

const Error: FC<{ type?: ErrorType, message?: string; error?: boolean }> = ({ children, error, message, type = 'data-unavailable' }) => (
  <>
    {
      error === undefined || !!error
        ? <Typography color='red'>{message || messages[type]}</Typography>
        : children
    }
  </>
  
);

export default Error;
