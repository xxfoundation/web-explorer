import { Table, TableBody, TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { TableContainer } from './TableContainer';

export type BaselineCell = {
  value: number | string | JSX.Element;
  props?: TableCellProps;
  key?: string | number;
};

export const BaselineTable: FC<{
  headers: BaselineCell[];
  rows: BaselineCell[][];
}> = ({ headers, rows }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(({ key, props, value }, index) => {
                return (
                  <TableCell {...props} key={key || index}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
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
