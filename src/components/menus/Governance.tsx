import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from '../../hooks';
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
          <MenuItem onClick={close}><Link to='/block'>Blocks</Link></MenuItem>
          <MenuItem onClick={close}><Link to='/extrinsic'>Extrinsics</Link></MenuItem>
          <MenuItem onClick={close}><Link to='/transfer'>Transfers</Link></MenuItem>
          <MenuItem onClick={close}><Link to='/event'>Events</Link></MenuItem>
        </Menu>
      )}
    </>
  )
}