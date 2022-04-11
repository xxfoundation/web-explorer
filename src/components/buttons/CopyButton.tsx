import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { IconButton } from '@mui/material';
import React from 'react';
import useCopyClipboard from '../../hooks/useCopyToClibboard';

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const [isCopied, staticCopy] = useCopyClipboard();
  return (
    <IconButton
      size='small'
      arial-label='copy'
      onClick={() => {
        staticCopy(value);
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
