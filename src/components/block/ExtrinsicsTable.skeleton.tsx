import { Skeleton } from '@mui/material';
import React, { FC } from 'react';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';

const BlockExtrinsics: FC = () => {
  return (
    <>
      <BaselineTable
        headers={BaseLineCellsWrapper([
          <Skeleton />,
          <Skeleton />,
          <Skeleton />,
          <Skeleton />,
          <Skeleton />,
          <Skeleton />
        ])}
        rows={[]}
      />
      <Skeleton />
    </>
  );
};

export default BlockExtrinsics;
