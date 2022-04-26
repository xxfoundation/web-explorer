import { Skeleton } from '@mui/material';
import React, { useMemo } from 'react';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import useRows from '../../hooks/useRows';

const BlocksTableSkeleton = () => {
  const cells = useRows(6).map((Cell) => <Cell />);
  const row = useMemo(() => cells.map(() => BaseLineCellsWrapper(cells)), [cells]);
  return <BaselineTable headers={BaseLineCellsWrapper(cells)} rows={row} footer={<Skeleton />} />;
};

export default BlocksTableSkeleton;
