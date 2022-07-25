import { Skeleton } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { BaseLineCellsWrapper, BaselineTable } from '.';
import genSkeletons from '../genSkeletons';

export const TableSkeleton: FC<{ rows: number; cells: number; footer?: boolean, header?: boolean }> = ({
  cells,
  footer,
  rows
}) => {
  const loadingCells = useMemo(() => {
    return BaseLineCellsWrapper(
      genSkeletons(cells).map((Cell) => {
        return <Cell />;
      })
    );
  }, [cells]);
  const loadingRows = useMemo(
    () => genSkeletons(rows).map(() => loadingCells),
    [loadingCells, rows]
  );
  const footerEl = useMemo(() => (footer ? <Skeleton /> : undefined), [footer]);

  return <BaselineTable headers={loadingCells} rows={loadingRows} footer={footerEl} />;
};
