import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Popover } from '@mui/material';
import React, { FC, useMemo, useRef } from 'react';
import { useToggle } from '../hooks';

export const Dropdown: FC<{
  buttonLabel: string | React.ReactNode
}> = ({ buttonLabel, children }) => {
  const [open, { toggle, toggleOff: close }] = useToggle();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const endIcon = useMemo(
    () => (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />),
    [open]
  );

  return (
    <>
      <Button ref={buttonRef} color={'inherit'} endIcon={endIcon} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Popover
        id='account-holders-table-filters'
        open={open}
        anchorEl={buttonRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={close}
      >
        {children}
      </Popover>
    </>
  );
};

export default Dropdown;
