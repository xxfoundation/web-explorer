import React from 'react';
import { Box, Grid } from '@mui/material';
import { MenuButton } from './menu.styles';

import BlockchainMenu from './Blockchain';
import GovernanceMenu from './Governance';

//export const DesktopNav = () => {
export default function DesktopNav() {

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs>
          <BlockchainMenu />
        </Grid>
        <Grid item xs>
          <MenuButton id="staking-button">Staking</MenuButton>
        </Grid>

        <Grid item xs>
          <GovernanceMenu />
        </Grid>
        <Grid item xs>
          <MenuButton id="accounts-button">Accounts</MenuButton>
        </Grid>
      </Grid>
    </Box>
  );
}
