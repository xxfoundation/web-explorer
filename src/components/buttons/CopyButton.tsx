import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Divider, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import useCopyClipboard from '../../hooks/useCopyToClibboard';

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const staticCopy = useCopyClipboard()[1];
  return (
    <Tooltip title={'copy'} placement='top'>
      <IconButton
        arial-label='copy'
        onClick={() => {
          staticCopy(value);
        }}
      >
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
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
