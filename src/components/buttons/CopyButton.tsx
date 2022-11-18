import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { IconButton, IconButtonProps, Stack, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import React, { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useCopyClipboard from '../../hooks/useCopyToClipboard';
import { theme } from '../../themes/default';

export const callbackCopyMessage = (t: TFunction) => (value: ReactNode) => {
  return (
    <Stack
      spacing={1}
      sx={{
        maxHeight: '60px',
        maxWidth: '300px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <CheckCircleOutlineIcon sx={{ color: theme.palette.success.light }} />
        <Typography fontSize={10} fontWeight={600}>
          {t('Copied to Clipboard')}
        </Typography>
      </Stack>
      <Typography fontSize={10} fontStyle={'italic'} component={'span'}>
        {value}
      </Typography>
    </Stack>
  );
};

const CopyButton: React.FC<{ value: string } & IconButtonProps> = ({ value, ...props }) => {
  const { t } = useTranslation();
  const [isCopied, staticCopy] = useCopyClipboard(4000);

  const onClick = useCallback(() => {
    staticCopy(value, callbackCopyMessage(t));
  }, [staticCopy, t, value]);

  return (
    <IconButton
      {...props}
      size='small'
      arial-label='copy'
      onClick={onClick}
    >
      {isCopied ? (
        <FileCopyIcon fontSize={'small'} color={'primary'} />
      ) : (
        <FileCopyOutlinedIcon fontSize={'small'} color={'primary'} />
      )}
    </IconButton>
  );
};

export default CopyButton;
