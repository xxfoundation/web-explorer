import { AppBar, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import Close from '@mui/icons-material/Close';
import useLocalStorage from '../hooks/useLocalStorage';
import Link from './Link';

const Banner = () => {
  const [dismissed, setDismissed] = useLocalStorage<string>('banner.dismissed');
  const dismiss = useCallback(() => {
    setDismissed('true');
  }, [setDismissed]);

  return dismissed ? null : (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'grey.800'
      }}
    >
      <Button
        size='small'
        variant='text'
        sx={{ color: 'white', position: 'absolute', top: 0, right: -15 }}
        onClick={dismiss}>
        <Close />
      </Button>
      <Typography variant='body2' sx={{ p: {xs: '1em 3em 0', sm: '1.5em 2em'}, color: 'white' }}>
        If you want to interact with the <b>xx network blockchain</b> use our web based wallet app
        (formerly known as the explorer)
      </Typography>
      <Button
        component={Link}
        sx={{ whiteSpace: 'nowrap', mb: {xs: 2, sm: 0} , my: {xs: 2, sm: 0}}}
        to={process.env.REACT_APP_WALLET_URL}
        size='small'
        variant='contained'
        color='primary'
        target='_blank'
        rel='noopener'
      >
        xx wallet
      </Button>
    </AppBar>
  );
}

export default Banner;
