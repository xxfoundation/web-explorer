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
          <MenuLink to={'/'} onClick={close}>Overview</MenuLink>
          <MenuLink to={'/'} onClick={close}>Democracy</MenuLink>
          <MenuLink to={'/'} onClick={close}>Council</MenuLink>
          <MenuLink to={'/'} onClick={close}>Tech Committee</MenuLink>
          <MenuLink to={'/'} onClick={close}>Treasury</MenuLink>
          <MenuLink to={'/'} onClick={close}>Bounties</MenuLink>
        </Menu>
      )}
    </>
  );
}
