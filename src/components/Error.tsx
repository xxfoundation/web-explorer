import React, { FC } from 'react';
import { Typography } from '@mui/material';

type ErrorType = 'data-unavailable' | 'general';

const messages: Record<ErrorType, string> = {
  'data-unavailable': 'Data unavailable...',
  'general': 'Something went wrong...'
}

const Error: FC<{ type: ErrorType }> = ({ type }) => (
  <Typography color='red'>{messages[type]}</Typography>
);

export default Error;
