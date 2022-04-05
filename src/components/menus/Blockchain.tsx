import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from '../../hooks';
import { MenuButton, MenuLink } from './menu.styles';

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
          <MenuLink onClick={close}><Link to={'/block'}>Blocks</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/extrinsic'>Extrinsics</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/transfer'>Transfers</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/event'>Events</Link></MenuLink>
        </Menu>
      )}
    </>
  )
}