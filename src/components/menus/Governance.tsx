import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu } from '@mui/material';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '../../hooks';
import { MenuButton, MenuLink } from './menu.styles';

export default function Governance() {
  const { t } = useTranslation();
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
        {t('Governance')}
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
          <MenuLink to={'/'} onClick={close}>
            {t('Overview')}
          </MenuLink>
          <MenuLink to={'/'} onClick={close}>
            {t('Democracy')}
          </MenuLink>
          <MenuLink to={'/'} onClick={close}>
            {t('Council')}
          </MenuLink>
          <MenuLink to={'/'} onClick={close}>
            {t('Tech Committee')}
          </MenuLink>
          <MenuLink to={'/'} onClick={close}>
            {t('Treasury')}
          </MenuLink>
          <MenuLink to={'/'} onClick={close}>
            {t('Bounties')}
          </MenuLink>
        </Menu>
      )}
    </>
  );
}
