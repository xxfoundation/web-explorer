import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import useCopyClipboard from '../../hooks/useCopyToClibboard';
import { theme } from '../../themes/default';

export const callbackCopyMessage = (value: ReactNode) => {
  return (
    <Stack spacing={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <CheckCircleOutlineIcon sx={{ color: theme.palette.success.light }} />
        <Typography fontSize={10} fontWeight={600}>
          Copied to Clipboard
        </Typography>
      </Stack>
      <Typography fontSize={10} fontStyle={'italic'} component={'span'}>
        {value}
      </Typography>
    </Stack>
  );
};

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const [isCopied, staticCopy] = useCopyClipboard(4000);
  return (
    <IconButton
      size='small'
      arial-label='copy'
      onClick={() => {
        staticCopy(value, callbackCopyMessage);
      }}
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
