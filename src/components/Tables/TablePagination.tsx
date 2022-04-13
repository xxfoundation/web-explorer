import { TablePagination as MuiTablePagination } from '@mui/material';
import React, { FC } from 'react';

const TablePagination: FC<{
  count: number;
  page: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}> = ({
  count,
  page,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  rowsPerPage = 15,
  rowsPerPageOptions = [rowsPerPage]
}) => {
  return (count > rowsPerPage || count > rowsPerPageOptions[0]) ? (
    <MuiTablePagination
      count={count}
      component={'div'}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onRowsPerPageChange={(event) => {
        onRowsPerPageChange(event);
      }}
      onPageChange={(_event, number) => {
        onPageChange(_event, number);
      }}
    />
  ) : (
    <></>
  );
};

export default TablePagination;
