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
          <MenuLink onClick={close}><Link to='/'>Overview</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/'>Democracy</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/'>Council</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/'>Tech Committee</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/'>Treasury</Link></MenuLink>
          <MenuLink onClick={close}><Link to='/'>Bounties</Link></MenuLink>
        </Menu>
      )}
    </>
  )
}