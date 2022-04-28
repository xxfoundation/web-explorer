import { Skeleton } from '@mui/material';

const genSkeletons = (count: number) => {
  return Array.from(Array(count).keys()).map(() => {
    return Skeleton;
  });
};

export default genSkeletons;
