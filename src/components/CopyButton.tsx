import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    // TODO send notification about
    return navigator.clipboard.writeText(text);
  }
}

const CopyButton: React.FC<{ value: string; label?: string }> = ({ label, value }) => {
  return (
    <Tooltip title={`copy ${label || ''}`} placement='top'>
      <IconButton
        arial-label='copy'
        onClick={() => {
          copyTextToClipboard(value);
        }}
      >
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
