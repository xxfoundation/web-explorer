import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { default as React, FC } from 'react';

type Props = {
  filled?: boolean;
};

const TagStyle = (filled?: boolean) => styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 9,
  paddingRight: 9,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.warning.dark,
  borderRadius: 5,
  fontSize: 12,
  color: theme.palette.warning.dark,
  backgroundColor: filled ? theme.palette.warning.light : theme.palette.warning.contrastText,
}));

const Tag: FC<Props> = ({ children, filled }) => {
  const TagWrap = TagStyle(filled);
  return (
  <TagWrap>
      {children}
  </TagWrap>
)};

export default Tag;
