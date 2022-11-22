import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu } from '@mui/material';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '../../hooks';
import { MenuButton, MenuLink } from './menu.styles';

export default function Blockchain() {
  const { t } = useTranslation();
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
        {t('Blockchain')}
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
          <MenuLink to={'/blocks'} onClick={close}>
            {t('Blocks')}
          </MenuLink>
          <MenuLink to={'/extrinsics'} onClick={close}>
            {t('Extrinsics')}
          </MenuLink>
          <MenuLink to={'/events'} onClick={close}>
            {t('Events')}
          </MenuLink>
          <MenuLink to={'/transfers'} onClick={close}>
            {t('Transfers')}
          </MenuLink>
        </Menu>
      )}
    </>
  );
}
