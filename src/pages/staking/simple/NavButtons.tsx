import React, { FC, useCallback } from 'react';
import { Box, Button, Stack, Checkbox } from '@mui/material';
import { useToggle } from '../../../hooks';

export type NavProps = {
  onBack?: () => void;
  canNext?: boolean;
  onNext?: () => void;
  canBack?: boolean;
  confirmStep?: boolean;
}

const NavButtons: FC<NavProps> = ({ canBack, canNext, confirmStep, onBack, onNext }) => {
  const [checked, { set }] = useToggle();

  const onChange = useCallback((evt: unknown, value: boolean) => {
    set(value);
  }, [set]);

  return (
    <Stack direction='row' sx={{ mt: 5 }} justifyContent='space-between'>
      <Box>
        {onBack && (
          <Button disabled={canBack !== undefined && !canBack} onClick={onBack} variant='contained'>
            Back
          </Button>
        )}
      </Box>
      <Box>
        {confirmStep ? (
          <>
            <Checkbox checked={checked} onChange={onChange} />
            <Button disabled={!checked} variant='contained' onClick={onNext}>
              Agree and Sign
            </Button>
          </>
        ) : (
          <>
            {onNext && (
              <Button disabled={canNext !== undefined && !canNext} onClick={onNext} variant='contained'>
                Next
              </Button>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default NavButtons;
