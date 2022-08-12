import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu } from '@mui/material';
import React, { useRef } from 'react';
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
        Staking
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
          <MenuLink to={'/staking/simple'} onClick={close}>
            Simple Staking
          </MenuLink>
          <MenuLink to={'/staking'} onClick={close}>
            Dashboard
          </MenuLink>
        </Menu>
      )}
    </>
  );
}
