import { Divider, Skeleton, TablePagination as MuiTablePagination } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../themes/default';

const styleConfig = {
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
};

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
  rowsPerPageOptions = [rowsPerPage],
  loading
}) => {
  if (loading) return <Skeleton />;
  if (count > rowsPerPage || count > rowsPerPageOptions[0])
    return (
      <>
        <Divider />
        <MuiTablePagination
          sx={styleConfig}
          count={count}
          component={'div'}
          page={loading ? 0 : page}
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
      </>
    );
  return <></>;
};

export default TablePagination;
