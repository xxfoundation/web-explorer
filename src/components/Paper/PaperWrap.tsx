import React, { FC } from 'react';
import { PaperStyled } from './PaperWrap.styled';

export const PaperWrap: FC = ({ children }) => (
  <PaperStyled>
      {children}
  </PaperStyled>
);
