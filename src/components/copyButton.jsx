import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import React from 'react';

function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }
}

const CopyButton = ({ value }) => {
  return (
    <IconButton
      arial-label="copy"
      onClick={() => {
        copyTextToClipboard(value);
      }}
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

export default CopyButton;
