import React, { FC } from 'react';
import { Typography } from '@mui/material';

type ErrorType = 'fetching' | 'general';

const messages: Record<ErrorType, string> = {
  'fetching': 'Data unavailable...',
  'general': 'Something went wrong...'
}

const Error: FC<{ type: ErrorType }> = ({ type }) => (
  <Typography color='red'>{messages[type]}</Typography>
);

export default Error;
