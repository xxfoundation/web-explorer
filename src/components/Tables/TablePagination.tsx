import { Divider, TablePagination as MuiTablePagination } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { theme } from '../../themes/default';

const TablePagination: FC<{
  count: number;
  page: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  loading?: boolean;
}> = ({
  count,
  page,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  rowsPerPage = 15,
  rowsPerPageOptions = [rowsPerPage]
}) => {
  const pagination = useMemo(() => {
    return (
      <MuiTablePagination
        sx={{
          mt: 1,
          '.MuiTablePagination-displayedRows': { fontSize: 14, fontWeight: 500 },
          '.MuiTablePagination-selectLabel': { fontSize: 14, fontWeight: 500 },
          '.MuiTablePagination-select': {
            fontSize: 14,
            fontWeight: 500,
            color: theme.palette.grey[500]
          },
          '.MuiTablePagination-actions > button': {
            fontSize: 14,
            fontWeight: 500,
            color: theme.palette.primary.main
          },
          '.MuiTablePagination-actions > button.MuiButtonBase-root.Mui-disabled.MuiIconButton-root.Mui-disabled':
            {
              color: theme.palette.grey[500]
            }
        }}
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
        backIconButtonProps={{ size: 'small' }}
        nextIconButtonProps={{ size: 'small' }}
      />
    );
  }, [count, page, rowsPerPage, rowsPerPageOptions, onRowsPerPageChange, onPageChange]);
  return count > rowsPerPage || count > rowsPerPageOptions[0] ? (
    <>
      <Divider /> {pagination}
    </>
  ) : (
    <></>
  );
};

export default TablePagination;
