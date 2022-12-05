import React, { FC, useCallback } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { styled, MenuItem, MenuItemProps, MenuList, MenuListProps } from '@mui/material';

import Dropdown from './Dropdown';
import locales from '../i18n/locales';

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: 'inherit',
    color: theme.palette.primary.main
  }
}));

export const LanguageMenu: FC<MenuListProps> = (props) => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((code: string) => () => {
    i18n.changeLanguage(code);
  }, [i18n]);

  return (
    <MenuList {...props}>
      {locales.map(({ code, label }) => (
        <StyledMenuItem
          key={code}
          onClick={changeLanguage(code)}
          selected={code === i18n.language}>
          {label}
        </StyledMenuItem>
      ))}
    </MenuList>
  );
}

const LanguageSwitcher = () => {
  return (
    <Dropdown buttonLabel={<LanguageIcon />}>
      <LanguageMenu />
    </Dropdown>
  )
}

export default LanguageSwitcher;
