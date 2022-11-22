import { styled, Box } from '@mui/material';
import type { CSSProperties } from 'react';

export const styles: CSSProperties = {
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

export const Ellipsis = styled(Box)({
  ...styles,
});

export default Ellipsis;
