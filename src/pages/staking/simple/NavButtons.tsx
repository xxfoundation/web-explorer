import React, { FC } from 'react';
import { Box, Button, Stack } from '@mui/material';

export type NavProps = {
  onBack?: () => void;
  canNext?: boolean;
  onNext?: () => void;
  canBack?: boolean;
}

const NavButtons: FC<NavProps> = ({ canBack, canNext, onBack, onNext }) => (
  <Stack direction='row' sx={{ mt: 5 }} justifyContent='space-between'>
    <Box>
      {onBack && (
        <Button sx={{ flex: '0 0 fit-content '}} disabled={canBack !== undefined && !canBack} onClick={onBack} variant='contained'>
          Back
        </Button>
      )}
    </Box>
    <Box>
      {onNext && (
        <Button sx={{ flex: '0 0 fit-content '}}  disabled={canNext !== undefined && !canNext} onClick={onNext} variant='contained'>
          Next
        </Button>
      )}
    </Box>
  </Stack>
);

export default NavButtons;
