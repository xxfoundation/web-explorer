import { Divider, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import React from 'react';

function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }
}

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  return (
    <IconButton
      arial-label='copy'
      onClick={() => {
        copyTextToClipboard(value);
      }}
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

export default CopyButton;

export const withCopy = (value: string, content: JSX.Element): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      {content}
      <Divider orientation='vertical' flexItem />
      <CopyButton value={value} />
    </Stack>
  );
};


