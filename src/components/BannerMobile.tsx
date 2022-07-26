import { AppBar, Button, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../themes/default';
import Link from './Link';

export default function BannerMobile() {
  return (
    <AppBar
      sx={{
        display: { sm: 'none', xs: 'flex' },
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'ActiveCaption'
      }}
    >
      <Typography variant='body2' sx={{ p: '1em', pr: '1em' }}>
        If you want to interact with the <b>xx network blockchain</b> use our web based wallet app
        (formally known as the explorer)
      </Typography>
      <ThemeProvider theme={theme}>
        <Button
          component={Link}
          to='https://explorer.xx.network'
          variant='contained'
          color='primary'
          fontSize='8px'
          padding='1em'
          margin='auto'
          marginRight='1em !important'
          height='4em'
          target='_blank'
          rel='noopener'
        >
          xx wallet
        </Button>
      </ThemeProvider>
    </AppBar>
  );
}
