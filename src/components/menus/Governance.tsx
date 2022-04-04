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
        aria-controls={opened ? 'governance-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={opened ? 'true' : undefined}
        ref={button}
        id='governance-button'
        onClick={toggle}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Governance
      </MenuButton>
      {button.current && (
        <Menu
          id='governance-menu'
          anchorEl={button.current}
          open={opened}
          onClose={close}
          MenuListProps={{
            'aria-labelledby': 'governance-button'
          }}
        >
          <MenuItem onClick={close}>
            <Link to='/blocks'>Blocks</Link>
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
