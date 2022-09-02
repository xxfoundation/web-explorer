import type { WithChildren } from '../../types';

import React, { FC } from 'react';
import { TableStyled } from './TableContainer.styled';

export const TableContainer: FC<WithChildren> = ({ children }) => (
  <TableStyled>
      {children}
  </TableStyled>
);
