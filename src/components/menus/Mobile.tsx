import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

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
          color: 'primary.contrastText'
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
                <Link to='/' onClick={close}>Blockchain</Link>
              </Typography>
              <Link to={'/block'} onClick={close}>Blocks</Link>
              <Link to='/extrinsic' onClick={close}>Extrinsics</Link>
              <Link to='/transfer' onClick={close}>Transfers</Link>
              <Link to='/event' onClick={close}>Events</Link>
              
              <Typography variant='h3' sx={{ mt: 2 }}>
                <Link to='/staking' onClick={close}>Staking</Link>
              </Typography>
              
              <Typography variant='h3' sx={{ mt: 2 }}>
                <Link to='governance' onClick={close}>Governance</Link>
              </Typography>
              <Link to='/' onClick={close}>Overview</Link>
              <Link to='/' onClick={close}>Democracy</Link>
              <Link to='/' onClick={close}>Council</Link>
              <Link to='/' onClick={close}>Tech Committee</Link>
              <Link to='/' onClick={close}>Treasury </Link>
              <Link to='/' onClick={close}>Bounties</Link>

              <Typography variant='h3' sx={{ mt: 2 }}>
                <Link to='/accounts' onClick={close}>Accounts</Link>
              </Typography>
              
            </Box>
          </Box>
            
        </Box>
      </Drawer>
    </Box>
  );
}
