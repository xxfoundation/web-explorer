import React, { FC, useMemo } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ErrorType = 'data-unavailable' | 'general';

type Props = TypographyProps & {
  message?: string;
  type?: ErrorType;
  error?: boolean;
}

const Error: FC<Props> = ({ children, error, message, type = 'data-unavailable', ...rest }) => {
  const { t } = useTranslation();

  const messages = useMemo<Record<ErrorType, string>>(
    () => ({
      'data-unavailable': t('Data unavailable...'),
      'general': t('Something went wrong...')
    }),
    [t]
  );

  return (
    <>
      {
        error === undefined || !!error
          ? <Typography color='red' {...rest}>{message || messages[type]}</Typography>
          : children
      }
    </>
    
  );
}

export default Error;
