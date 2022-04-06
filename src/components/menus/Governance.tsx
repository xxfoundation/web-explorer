import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, Menu } from '@mui/material';
import React, { useRef } from 'react';
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
          <MenuLink onClick={close}><Link href='/'>Overview</Link></MenuLink>
          <MenuLink onClick={close}><Link href='/'>Democracy</Link></MenuLink>
          <MenuLink onClick={close}><Link href='/'>Council</Link></MenuLink>
          <MenuLink onClick={close}><Link href='/'>Tech Committee</Link></MenuLink>
          <MenuLink onClick={close}><Link href='/'>Treasury</Link></MenuLink>
          <MenuLink onClick={close}><Link href='/'>Bounties</Link></MenuLink>
        </Menu>
      )}
    </>
  );
}
