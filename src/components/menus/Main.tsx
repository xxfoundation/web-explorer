import { Box, Grid } from '@mui/material';
import React from 'react';
import BlockchainMenu from './Blockchain';
import { MenuButton } from './menu.styles';

export default function DesktopNav() {
  return (
    <Box sx={{ mt: -2.75 }}>
      <Grid container spacing={2} wrap='nowrap'>
        <Grid item xs>
          <BlockchainMenu />
        </Grid>
        <Grid item xs>
          <MenuButton id='accounts-button' href='/staking'>
            Staking
          </MenuButton>
        </Grid>
        <Grid item xs>
          <MenuButton id='accounts-button' href='/accounts'>
            Accounts
          </MenuButton>
        </Grid>
        <Grid item xs>
          <MenuButton id='glossary-button' href='/glossary'>
            Glossary
          </MenuButton>
        </Grid>
      </Grid>
    </Box>
  );
}
