import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
          }
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='left'
        open={opened}
        onClose={close}
        variant='temporary'
      >
        <Box
          sx={{
            p: 2,
            height: 1,
            backgroundColor: '#4F4F4F',
            color: '#ffffff',
            width: '100%'
          }}
        >
          <IconButton sx={{ mb: 2 }} onClick={close}>
            <CloseIcon
              sx={{ color: 'primary.contrastText' }}
            />
          </IconButton>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2 }}>
            <ListItemButton>
              <Link to='/'><ListItemText primary='Blockchain' /></Link>
            </ListItemButton>
            <ListItemButton>
              <Link to='/staking'><ListItemText primary='Staking' /></Link>
            </ListItemButton>
            <ListItemButton>
              <Link to='governance'><ListItemText primary='Governance' /></Link>
            </ListItemButton>
            <ListItemButton>
              <Link to='/accounts'><ListItemText primary='Accounts' /></Link>
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
