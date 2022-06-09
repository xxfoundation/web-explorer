import React, { FC } from 'react';
import { TableCell, TableRow, Skeleton } from '@mui/material';

const SkeletonRows: FC<{ rows: number, cells: number }> = (props) => {
  const rows = Array.from(Array(props.rows).keys());
  const cells =  Array.from(Array(props.cells).keys());

  return <>
    {rows.map((row) => (
      <TableRow key={row}>
        {cells.map((cell) => (
          <TableCell key={`${row}-${cell}`}>
            <Skeleton />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
}

export default SkeletonRows;