import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material';
import React, { FC } from 'react';

const LoadingButtonStyle = styled(LoadingButton)<LoadingButtonProps>(({}) => ({
  fontSize: 14,
  fontWeight: 500
}));

const DownloadDataButton: FC<{ onClick: () => void }> = ({ children }) => {
  return (
    <LoadingButtonStyle
      sx={{ fontSize: '14px', fontWeight: 500 }}
      loading={false}
      startIcon={<FileDownloadIcon />}
    >
      {children}
    </LoadingButtonStyle>
  );
};

export default DownloadDataButton;
