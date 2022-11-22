import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Link from '../Link';

export default function MobileNav() {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const close = useCallback(() => setOpened(false), [setOpened]);
  const open = useCallback(() => setOpened(true), [setOpened]);

  return (
    <Box>
      <IconButton
        edge='start'
        color='inherit'
        aria-label={t('open drawer') ?? 'open drawer'}
        onClick={open}
        sx={{
          m: 0,
          mr: 2,
          p: 0,
          display: {
            xs: 'block',
            sm: 'none'
          },
          color: 'primary.dark'
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='left'
        open={opened}
        onClose={close}
        variant='temporary'
        sx={{
          '.MuiDrawer-paper': { width: '100%' }
        }}
      >
        <Box
          sx={{
            height: 1,
            backgroundColor: '#4F4F4F',
            width: '100%'
          }}
        >
          <Box sx={{ p: 4 }}>
            <IconButton onClick={close} sx={{ p: 0, ml: -0.5 }}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
            <Box
              sx={{
                py: 4,
                a: {
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  py: 1.5
                }
              }}
            >
              <Typography variant='h4'>
                <Link to='/' onClick={close}>
                  {t('Blockchain')}
                </Link>
              </Typography>
              <Link to={'/blocks'} onClick={close}>
                {t('Blocks')}
              </Link>
              <Link to='/extrinsics' onClick={close}>
                {t('Extrinsics')}
              </Link>
              <Link to='/transfers' onClick={close}>
                {t('Transfers')}
              </Link>
              <Link to='/events' onClick={close}>
                {t('Events')}
              </Link>
              <Typography variant='h4' sx={{ mt: 2 }}>
                <Link to='/staking' onClick={close}>
                  {t('Staking')}
                </Link>
              </Typography>
              <Typography variant='h4' sx={{ mt: 2 }}>
                <Link to='/accounts' onClick={close}>
                  {t('Accounts')}
                </Link>
              </Typography>
              <Typography variant='h4' sx={{ mt: 2 }}>
                <Link to='/glossary' onClick={close}>
                  {t('Glossary')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
