import React, { FC } from 'react';
import { TableStyled } from './TableContainer.styled';

export const TableContainer: FC = ({ children }) => (
  <TableStyled>
      {children}
  </TableStyled>
);
