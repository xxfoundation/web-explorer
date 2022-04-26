import { Skeleton } from '@mui/material';
import { useMemo } from 'react';

const useRows = (count: number) => {
  return useMemo(
    () =>
      Array.from(Array(count).keys()).map(() => {
        return Skeleton;
      }),
    [count]
  );
};

export default useRows;
