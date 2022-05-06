import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableProps,
  TableRow
} from '@mui/material';
import React, { FC, useMemo } from 'react';
import { TableContainer } from './TableContainer';

export type BaselineCell = {
  value: number | string | JSX.Element;
  props?: TableCellProps;
  key?: string | number;
};

export const BaselineTable: FC<{
  headers: BaselineCell[];
  rows: BaselineCell[][];
  footer?: JSX.Element;
  tableProps?: TableProps;
}> = ({ headers, rows, footer, tableProps = {} }) => {
  const memoistHeaders = useMemo(() => {
    return headers.map(({ key, props, value }, index) => {
      return (
        <TableCell {...props} key={key || index}>
          {value}
        </TableCell>
      );
    });
  }, [headers]);
  const memoistRows = useMemo(() => {
    return rows.map((row, index) => {
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
  }, [rows]);
  return (
    <>
      <TableContainer>
        <Table {...tableProps}>
          <TableHead>
            <TableRow>{memoistHeaders}</TableRow>
          </TableHead>
          <TableBody>{memoistRows}</TableBody>
        </Table>
        {footer}
      </TableContainer>
    </>
  );
};

// TODO make those two obsolete
export const BaseLineCellWrapper = (element: JSX.Element | string | number) => {
  return {
    value: element
  };
};

export const BaseLineCellsWrapper = (elements: (JSX.Element | string | number)[]) => {
  return elements.map(BaseLineCellWrapper);
};
