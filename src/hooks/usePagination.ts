import { ChangeEvent, useCallback, useState } from 'react';

type Props<T> = {
  rowsPerPage: number;
  cursorField: keyof T;
};

function usePagination<T extends object>(
  props: Props<T>
): [
  T[keyof T] | undefined,
  number,
  number,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  (data?: T) => (_: unknown, number: number) => void
] {
  const [cursorField, setCursorField] = useState<T[keyof T]>();
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setCursorField(undefined);
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback(
    (data?: T) => {
      return (_: unknown, number: number) => {
        if (cursorField !== undefined && data && data[props.cursorField] !== undefined) {
          setCursorField(data[props.cursorField]);
        }
        setPage(number);
      };
    },
    [cursorField, props.cursorField]
  );

  return [cursorField, rowsPerPage, page, onRowsPerPageChange, onPageChange];
}

export default usePagination;
