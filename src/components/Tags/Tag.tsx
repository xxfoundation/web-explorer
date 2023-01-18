import { BoxProps } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { FC } from 'react';
import { theme } from '../../themes/tags';
import { TagStyle, TagStylePrice } from './Tag.styled';

type Props = {
  filled?: boolean;
  price?: boolean
} & BoxProps;

const Tag: FC<Props> = ({ children, filled, price, ...props }) => {
  const TagWrap = price ? TagStylePrice(filled) : TagStyle(filled);
  return (
    <ThemeProvider theme={theme}>
      <TagWrap {...props}>{children}</TagWrap>
    </ThemeProvider>
  );
};

export default Tag;
