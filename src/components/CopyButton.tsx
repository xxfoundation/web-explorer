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
