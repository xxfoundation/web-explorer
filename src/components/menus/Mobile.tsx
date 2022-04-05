import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import InternalLink from '../Link';

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
          '.MuiDrawer-paper': { width: '100%', } 
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
              <CloseIcon
                sx={{ color: 'secondary.contrastText' }}
              />
            </IconButton>
            <Box 
              sx={{ 
                py: 4,
                'a': { 
                  color: 'secondary.contrastText',
                  textDecoration: 'none',
                  display: 'block',
                  py: 1.5
                }
              }}
            >
              <Typography variant='h3'>
                <InternalLink to='/' onClick={close}>Blockchain</InternalLink>
              </Typography>
              <InternalLink to={'/blocks'} onClick={close}>Blocks</InternalLink>
              <InternalLink to='/extrinsics' onClick={close}>Extrinsics</InternalLink>
              <InternalLink to='/transfers' onClick={close}>Transfers</InternalLink>
              <InternalLink to='/events' onClick={close}>Events</InternalLink>
              
              <Typography variant='h3' sx={{ mt: 2 }}>
                <InternalLink to='/staking' onClick={close}>Staking</InternalLink>
              </Typography>
              
              <Typography variant='h3' sx={{ mt: 2 }}>
                <InternalLink to='governance' onClick={close}>Governance</InternalLink>
              </Typography>
              <Link href='/' onClick={close}>Overview</Link>
              <Link href='/' onClick={close}>Democracy</Link>
              <Link href='/' onClick={close}>Council</Link>
              <Link href='/' onClick={close}>Tech Committee</Link>
              <Link href='/' onClick={close}>Treasury</Link>
              <Link href='/' onClick={close}>Bounties</Link>

              <Typography variant='h3' sx={{ mt: 2 }}>
                <InternalLink to='/accounts' onClick={close}>Accounts</InternalLink>
              </Typography>
              
            </Box>
          </Box>
            
        </Box>
      </Drawer>
    </Box>
  );
}
