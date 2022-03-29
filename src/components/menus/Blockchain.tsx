import React, {  useRef } from 'react';
import { Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { MenuButton } from './menu.styles';
import { useToggle } from '../../hooks';


export default function Blockchain() {
  const button = useRef(null);
  const [opened, { toggle, toggleOff: close }] = useToggle();

  return (
    <>
      <MenuButton
        ref={button}
        id="blockchain-button"
        aria-controls={opened ? 'blockchain-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? 'true' : undefined}
        onClick={toggle}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Blockchain
      </MenuButton>
      {button.current && (
        <Menu
          id="blockchain-menu"
          anchorEl={button.current}
          open={opened}
          onClose={close}
          MenuListProps={{
            'aria-labelledby': 'blockchain-button'
          }}
        >
          <MenuItem onClick={close}>Blocks</MenuItem>
          <MenuItem onClick={close}>Extrinsics</MenuItem>
          <MenuItem onClick={close}>Transfers</MenuItem>
          <MenuItem onClick={close}>Events</MenuItem>
        </Menu>
      )}
    </>
  )
}