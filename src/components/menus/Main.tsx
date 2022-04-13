import { Box, Grid } from '@mui/material';
import React from 'react';
import BlockchainMenu from './Blockchain';
import GovernanceMenu from './Governance';
import { MenuButton } from './menu.styles';

export default function DesktopNav() {

  return (
    <Box sx={{ mt: -2.75 }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <BlockchainMenu />
        </Grid>
        <Grid item xs>
          <MenuButton id='staking-button' href='/staking'>Staking</MenuButton>
        </Grid>

        <Grid item xs>
          <GovernanceMenu />
        </Grid>
        <Grid item xs>
          <MenuButton id='accounts-button' href='/account'>Accounts</MenuButton>
        </Grid>
      </Grid>
    </Box>
  );
}
