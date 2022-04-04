import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import React, { useRef } from 'react';
import { useToggle } from '../../hooks';
import Link from '../Link';
import { MenuButton } from './menu.styles';

export default function Blockchain() {
  const button = useRef(null);
  const [opened, { toggle, toggleOff: close }] = useToggle();

  return (
    <>
      <MenuButton
        ref={button}
        id='blockchain-button'
        aria-controls={opened ? 'blockchain-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={opened ? 'true' : undefined}
        onClick={toggle}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Blockchain
      </MenuButton>
      {button.current && (
        <Menu
          id='blockchain-menu'
          anchorEl={button.current}
          open={opened}
          onClose={close}
          MenuListProps={{
            'aria-labelledby': 'blockchain-button'
          }}
        >
          <MenuItem onClick={close}>
            <Link to={'/blocks'}>Blocks</Link>
          </MenuItem>
          <MenuItem onClick={close}>
            <Link to='/extrinsics'>Extrinsics</Link>
          </MenuItem>
          <MenuItem onClick={close}>
            <Link to='/transfers'>Transfers</Link>
          </MenuItem>
          <MenuItem onClick={close}>
            <Link to='/events'>Events</Link>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
