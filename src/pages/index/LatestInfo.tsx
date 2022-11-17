import { Box, Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { NewAccountsChart, TransfersLineChart, Timeframe } from '../../components/charts';
import LatestBlocksList from '../../components/blockchain/LatestBlocksList';
import LatestTransfersList from '../../components/blockchain/LatestTransfersList';
import { useToggle } from '../../hooks';

const LatestInfo = () => {
  const [transferFullScreen, { set: setTransfersFullScreen }] = useToggle();
  const transfersLineChartOnChange = useCallback(
    (timeframe: Timeframe) => {
      setTransfersFullScreen(timeframe === 'All')
    },
    [setTransfersFullScreen]
  );


  const [accountsFullScreen, { set: setAccountsFullscreen }] = useToggle();
  const accountsLineChartOnChange = useCallback(
    (timeframe: Timeframe) => {
      setAccountsFullscreen(timeframe === 'All')
    },
    [setAccountsFullscreen]
  );

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant='h3' gutterBottom>
        Latest Updates
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LatestBlocksList />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LatestTransfersList />
        </Grid>
        <Grid item xs={12} sm={transferFullScreen ? 12 : 6}>
          <TransfersLineChart onEraTimeframeChange={transfersLineChartOnChange} />
        </Grid>
        <Grid item xs={12} sm={accountsFullScreen ? 12 : 6}>
          <NewAccountsChart onEraTimeframeChange={accountsLineChartOnChange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LatestInfo;
