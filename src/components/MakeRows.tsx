import { Skeleton } from '@mui/material';

const makeRows = (count: number) => {
  return Array.from(Array(count).keys()).map(() => {
    return Skeleton;
  });
};

export default makeRows;
