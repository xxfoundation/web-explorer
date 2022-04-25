import { Skeleton } from '@mui/material';
import React from 'react';
import useRows from '../../hooks/useRows';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';

const EventsTable: React.FC = () => {
  const rowsCount = useRows(4).map((Cell) => <Cell />);
  return (
    <BaselineTable
      headers={BaseLineCellsWrapper(rowsCount)}
      rows={rowsCount.map(() => {
        return BaseLineCellsWrapper(rowsCount);
      })}
      footer={<Skeleton />}
    />
  );
};

export default EventsTable;
