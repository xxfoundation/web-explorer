import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import Link from '../Link';

export default function MobileNav() {
  const [opened, setOpened] = useState(false);
  const close = useCallback(() => setOpened(false), [setOpened]);
  const open = useCallback(() => setOpened(true), [setOpened]);

  return (
    <Box>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='open drawer'
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
                  Blockchain
                </Link>
              </Typography>
              <Link to={'/blocks'} onClick={close}>
                Blocks
              </Link>
              <Link to='/extrinsics' onClick={close}>
                Extrinsics
              </Link>
              <Link to='/transfers' onClick={close}>
                Transfers
              </Link>
              <Link to='/events' onClick={close}>
                Events
              </Link>
              <Typography variant='h4' sx={{ mt: 2 }}>
                <Link to='/staking' onClick={close}>
                  Staking
                </Link>
              </Typography>
              <Link to='/staking' onClick={close}>
                Validators
              </Link>
              <Link to='/staking/simple' onClick={close}>
                Simple Staker
              </Link>
              <Typography variant='h4' sx={{ mt: 2 }}>
                <Link to='/accounts' onClick={close}>
                  Accounts
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
