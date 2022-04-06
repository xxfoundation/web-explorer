import { TableStyled } from './TableContainer.styled';
import { default as React, FC } from 'react';

export const TableContainer: FC = ({ children }) => (
  <TableStyled>
      {children}
  </TableStyled>
);
