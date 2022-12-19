import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, ButtonProps, Popover } from '@mui/material';
import React, { FC, useRef } from 'react';
import { useToggle } from '../hooks';
import { WithChildren } from '../types';

type Props = WithChildren & {
  buttonLabel: string | React.ReactNode;
  disabled?: boolean;
  buttonProps?: ButtonProps;
}

export const Dropdown: FC<Props> = ({ buttonLabel, buttonProps, children, disabled = false }) => {
  const [open, { icon, toggle, toggleOff: close }] = useToggle();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        disabled={disabled}
        sx={{ mx: -1 }}
        ref={buttonRef}
        endIcon={icon}
        color={'inherit'}
        onClick={toggle}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
      {children && (
        <Popover
          id='account-holders-table-filters'
          open={open}
          anchorEl={buttonRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          onClose={close}
        >
          <Box sx={{ p: { md: 2, sm: 1.5 }, pt: 4, position: 'relative' }}>
            <Button
              sx={{ position: 'absolute', right: 8, top: 8, p: 0, minWidth: 0 }}
              onClick={close}
              variant='text'>
              <CloseOutlined />
            </Button>
            {children}
          </Box>
        </Popover>
      )}
    </>
  );
};

export default Dropdown;
