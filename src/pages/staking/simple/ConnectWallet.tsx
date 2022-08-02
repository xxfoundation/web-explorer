import React, { FC, useCallback } from 'react';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useToggle } from '../../../hooks';
import MnemonicDialog from './MnemonicDialog';
import KeyfileDialog from './KeyfileDialog';

const ConnectWallet: FC = () => {
  const [mnemonicDialogOpen, mnemonicDialog] = useToggle();
  const [keyfileDialogOpen, keyfileDialog] = useToggle();

  const handleKeyfileClose = useCallback(() => {
    keyfileDialog.toggleOff();
  }, [keyfileDialog]);

  return (
    <>
      <MnemonicDialog
        open={mnemonicDialogOpen}
        onClose={mnemonicDialog.toggleOff} />
      <KeyfileDialog
        open={keyfileDialogOpen}
        onClose={handleKeyfileClose} />
      <Stack spacing={4}>
        <Typography variant='h2'>
          Connect Wallet
        </Typography>
        <Typography variant='body3'>
          Maecenas accumsan lorem turpis, quis convallis sem
          vehicula in. Nulla bibendum eget sapien vel posuere.
          Praesent elementum risus ac purus dapibus, at malesuada
          ex pretium. Mauris pulvinar sit amet dolor sed ultrices.
          Curabitur facilisis quam dui, et gravida ante posuere a.
          Duis hendrerit nisi tortor, sed luctus nibh sagittis a.
          Mauris euismod ex a risus pharetra lacinia. 
        </Typography>
        <Stack spacing={5} direction={{ xs: 'column', sm: 'row' }}>
          <Stack spacing={1}>
            <Typography variant='h4'>
              Enter Passcodes
            </Typography>
            <Button onClick={mnemonicDialog.toggleOn} variant='contained'>
              Mnemonic Phrase
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Typography variant='h4'>
              Import File
            </Typography>
            <Button onClick={keyfileDialog.toggleOn} variant='contained'>
              Keyfile (JSON)
            </Button>
          </Stack>
        </Stack>
        <Alert sx={{ mt: 3 }} severity='warning'>
          <Typography variant='h5' sx={{ pb: 1}}>
            Banner Header
          </Typography>
          <Typography variant='body3'>
            Maecenas accumsan lorem turpis, quis convallis sem vehicula in. Nulla bibendum eget sapien vel posuere. Praesent elementum risus ac purus dapibus, at malesuada ex pretium. Mauris pulvinar sit amet dolor sed ultrices. Curabitur facilisis quam dui, et gravida ante posuere a. Duis hendrerit nisi tortor, sed luctus nibh sagittis a. Mauris euismod ex a risus pharetra lacinia. 
          </Typography>
        </Alert>
      </Stack>
    </>
  )
};

export default ConnectWallet;
