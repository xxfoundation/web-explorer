import {  TagStyle } from './Tag.styled';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../themes/tags';
import { default as React, FC } from 'react';

type Props = {
  filled?: boolean;
};

const Tag: FC<Props> = ({ children, filled }) => {
  const TagWrap = TagStyle(filled);
  return (
    <ThemeProvider theme={theme}>
      <TagWrap>
          {children}
      </TagWrap>
    </ThemeProvider>
)};

export default Tag;
