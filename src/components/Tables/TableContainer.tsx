import { TableStyled } from './TableContainer.styled';
import { default as React, FC } from 'react';

export const TableWrap: FC = ({ children }) => (
  <TableStyled>
      {children}
  </TableStyled>
);
