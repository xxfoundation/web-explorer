import React, { FC, useState } from 'react';
import { Box, Grid } from '@mui/material';
import genSkeletons from '../genSkeletons';
import type { Block, Transfer } from './types'

export const ItemHandlerSkeleton: FC<{ number: number }> = ({ number }) => {
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

// TODO Fix this function passing calling React.FC correctly
// export const Renderer: FC<{ newData: Block[] | Transfer[], handler: React.FC<Block | Transfer> }> = ({ newData }) => {
//   const [state, setState] = useState<{ data: any[] }>({ data: [] });
//   React.useEffect(() => {
//     const oldHashes = state.data.map((b) => b.hash);
//     setState((prevState) => {
//       return {
//         ...prevState,
//         data: newData.map((elem) => {
//           return {
//             ...elem,
//             newEntry: oldHashes.length && !oldHashes.includes(elem.hash)
//           };
//         })
//       };
//     });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [newData]);

//   return (
//     <>
//       {state.data.map((b) => {
//         return handler({ elem={ b } key={ b.hash } });
//       })}
//     </>
//   );
// };