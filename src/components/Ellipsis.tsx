import { styled, Box } from '@mui/material';
import type { CSSProperties } from 'react';

export const styles: CSSProperties = {
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

// duplication here is because mui is being retarded. Try passing styles below.
export const Ellipsis = styled(Box)({
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

export default Ellipsis;
