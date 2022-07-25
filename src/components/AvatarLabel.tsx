import React from 'react';
import { Avatar, Typography } from '@mui/material';

const AvatarLabel: React.FC<{ src: string; srcAlt: string; text: string }> = ({
  src,
  srcAlt,
  text
}) => {
  return (
    <>
      <Avatar alt={srcAlt} src={src} />
      <Typography>{text}</Typography>
    </>
  );
};

export default AvatarLabel;