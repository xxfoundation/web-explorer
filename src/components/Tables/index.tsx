import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableProps,
  TableRow
} from '@mui/material';
import Error from '../Error';
import React, { FC, useMemo } from 'react';
import { TableContainer } from './TableContainer';
import { TableSkeleton } from './TableSkeleton';

export type BaselineCell = {
  value: number | string | JSX.Element;
  props?: TableCellProps;
  key?: string | number;
};

type Props = {
  loading?: boolean;
  error?: boolean;
  rowsPerPage?: number;
  headers: BaselineCell[];
  rows: BaselineCell[][];
  footer?: JSX.Element | React.ReactNode;
  tableProps?: TableProps;
}

export const BaselineTable: FC<Props> = ({ loading, error, headers, rows, rowsPerPage = 20, footer, tableProps = {} }) => {
  const memoistHeaders = useMemo(() => {
    return headers.map(({ key, props, value }, index) => {
      return (
        <TableCell {...props} key={key || index}>
          {value}
        </TableCell>
      );
    });
  }, [headers]);

  const memoizedRows = useMemo(() => {
    return error ? (
      <TableRow><TableCell colSpan={headers.length}><Error type='data-unavailable' /></TableCell></TableRow>
    ) : rows.map((row, index) => {
      return (

        <TableRow key={index}>
          {row.map(({ key, props, value }, cellIndex) => {
            return (
              <TableCell {...props} key={key || cellIndex}>
                {value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  }, [error, headers.length, rows]);

  if (loading) return <TableSkeleton rows={rowsPerPage} cells={headers.length} footer />;

  return (
    <TableContainer>
      <Table {...tableProps}>
        <TableHead>
          <TableRow>{memoistHeaders}</TableRow>
        </TableHead>
        <TableBody>{memoizedRows}</TableBody>
      </Table>
      {footer}
    </TableContainer>
  );
};

export const BaseLineCellWrapper = (element: JSX.Element | string | number) => {
  return {
    value: element
  };
};

export const BaseLineCellsWrapper = (elements: (JSX.Element | string | number)[]) => {
  return elements.map(BaseLineCellWrapper);
};
