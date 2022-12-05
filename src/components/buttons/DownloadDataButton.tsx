import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material';
import React, { FC } from 'react';

const LoadingButtonStyle = styled(LoadingButton)<LoadingButtonProps>(({}) => ({
  fontSize: 14,
  fontWeight: 500
}));

const DownloadDataButton: FC<LoadingButtonProps & { onClick: () => void }> = ({
  children,
  ...props
}) => {
  return (
    <LoadingButtonStyle
      {...props}
      loading={false}
      startIcon={<FileDownloadIcon />}
    >
      {children}
    </LoadingButtonStyle>
  );
};

export default DownloadDataButton;
