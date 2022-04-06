import { TablePagination as MuiTablePagination } from '@mui/material';
import React, { FC, useState } from 'react';

const TablePagination: FC<{
  count: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange(): void;
}> = ({ count, onPageChange, rowsPerPage, rowsPerPageOptions = [rowsPerPage] }) => {
  const [page] = useState(0);
  return count > 15 ? (
    <MuiTablePagination
      count={count}
      component={'div'}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={onPageChange}
    />
  ) : (
    <></>
  );
};

export default TablePagination;
