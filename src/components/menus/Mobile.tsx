import React, { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function MobileNav() {
  const [opened, setOpened] = useState(false);
  const close = useCallback(() => setOpened(false), [setOpened]);
  const open = useCallback(() => setOpened(true), [setOpened]);


  return (
    <Box>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
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
        anchor="left"
        open={opened}
        onClose={close}
        variant="temporary"
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
          <IconButton sx={{ mb: 2 }}>
            <CloseIcon
              onClick={close}
              sx={{ color: 'primary.contrastText' }}
            />
          </IconButton>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2 }}>
            <ListItemButton>
              <ListItemText primary="Blockchain" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Staking" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Governance" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Accounts" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
