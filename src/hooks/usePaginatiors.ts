import { ChangeEvent, useCallback, useState } from 'react';

type Props<T> = {
  rowsPerPage: number;
  cursorField: keyof T;
};

type Result<T> = {
  cursorField: T[keyof T] | undefined;
  rowsPerPage: number;
  page: number;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  makeOnPageChange: (data: T) => (_: unknown, number: number) => void;
  limit: number;
  offset: number;
};

export function usePaginatorByCursor<T extends object>(props: Props<T>): Result<T> {
  const [cursorField, setCursorField] = useState<T[keyof T]>();
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setCursorField(undefined);
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  
  const makeOnPageChange = useCallback(
    (data: T) => {
      return (_: unknown, number: number) => {
        if (cursorField === undefined && data && data[props.cursorField] !== undefined) {
          setCursorField(data[props.cursorField]);
        }
        setPage(number);
      };
    },
    [cursorField, props.cursorField]
  );

  return {
    cursorField,
    rowsPerPage,
    page,
    onRowsPerPageChange,
    makeOnPageChange,
    limit: rowsPerPage,
    offset: page * rowsPerPage
  };
}
