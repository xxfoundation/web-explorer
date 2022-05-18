import { Box, Grid } from '@mui/material';
import React, { FC } from 'react';
import genSkeletons from '../genSkeletons';

export const ListSkeleton: FC<{ number: number }> = ({ number }) => {
  return (
    <>
      {genSkeletons(number).map((Skeleton, index) => {
        return (
          <Box sx={{ mb: 4 }} key={index}>
            <Grid container>
              <Grid item xs>
                <Skeleton />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs>
                <Skeleton />
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
