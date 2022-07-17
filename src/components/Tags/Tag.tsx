import { BoxProps } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { FC } from 'react';
import { theme } from '../../themes/tags';
import { TagStyle } from './Tag.styled';

type Props = {
  filled?: boolean;
} & BoxProps;

const Tag: FC<Props> = ({ children, filled, ...props }) => {
  const TagWrap = TagStyle(filled);
  return (
    <ThemeProvider theme={theme}>
      <TagWrap {...props}>{children}</TagWrap>
    </ThemeProvider>
  );
};

export default Tag;
