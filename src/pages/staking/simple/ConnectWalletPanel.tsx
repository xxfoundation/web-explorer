import React, { FC, useCallback } from 'react';
import { Alert, Button, Link, Stack, Typography } from '@mui/material';
import { keyring } from '@polkadot/ui-keyring';

import { useToggle } from '../../../hooks';
import GenerateDialog from './GenerateDialog';
import MnemonicDialog from './MnemonicDialog';
import KeyfileDialog from './KeyfileDialog';
import useAccounts from '../../../hooks/useAccounts';

const ConnectWallet: FC = () => {
  const accounts = useAccounts();
  const [generateDialogOpen, generateDialog] = useToggle();
  const [mnemonicDialogOpen, mnemonicDialog] = useToggle();
  const [keyfileDialogOpen, keyfileDialog] = useToggle();

  const handleKeyfileClose = useCallback(() => {
    keyfileDialog.toggleOff();
  }, [keyfileDialog]);

  const forget = useCallback(() => {
    const confirmed = confirm(
      `Are you sure you want to delete ${accounts.allAccounts.length} accounts?`
    );
    if (confirmed) {
      accounts.allAccounts.forEach((acct) => {
        keyring.forgetAccount(acct);
      });
    }
  }, [accounts.allAccounts]);

  return (
    <>
      <GenerateDialog open={generateDialogOpen} onClose={generateDialog.toggleOff} />
      <MnemonicDialog open={mnemonicDialogOpen} onClose={mnemonicDialog.toggleOff} />
      <KeyfileDialog open={keyfileDialogOpen} onClose={handleKeyfileClose} />
      <Stack spacing={4}>
        <Typography variant='h2'>Connect Wallet</Typography>
        <Typography variant='body3'>
          Maecenas accumsan lorem turpis, quis convallis sem vehicula in. Nulla bibendum eget sapien
          vel posuere. Praesent elementum risus ac purus dapibus, at malesuada ex pretium. Mauris
          pulvinar sit amet dolor sed ultrices. Curabitur facilisis quam dui, et gravida ante
          posuere a. Duis hendrerit nisi tortor, sed luctus nibh sagittis a. Mauris euismod ex a
          risus pharetra lacinia.
        </Typography>
        {accounts.hasAccounts && (
          <Alert severity='success'>
            Found {accounts.allAccounts.length} accounts. &nbsp;
            <Link onClick={forget} href='#' underline='hover'>
              Forget?
            </Link>
          </Alert>
        )}
        <Stack spacing={5} direction={{ xs: 'column', sm: 'row' }}>
          <Stack spacing={1}>
            <Typography variant='h4'>New Wallet</Typography>
            <Button onClick={generateDialog.toggleOn} variant='contained'>
              Generate Mnemonics
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Typography variant='h4'>Enter Passcodes</Typography>
            <Button onClick={mnemonicDialog.toggleOn} variant='contained'>
              Mnemonic Phrase
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Typography variant='h4'>Import File</Typography>
            <Button onClick={keyfileDialog.toggleOn} variant='contained'>
              Keyfile (JSON)
            </Button>
          </Stack>
        </Stack>
        <Alert sx={{ mt: 3 }} severity='warning'>
          <Typography variant='h5' sx={{ pb: 1 }}>
            Banner Header
          </Typography>
          <Typography variant='body3'>
            Maecenas accumsan lorem turpis, quis convallis sem vehicula in. Nulla bibendum eget
            sapien vel posuere. Praesent elementum risus ac purus dapibus, at malesuada ex pretium.
            Mauris pulvinar sit amet dolor sed ultrices. Curabitur facilisis quam dui, et gravida
            ante posuere a. Duis hendrerit nisi tortor, sed luctus nibh sagittis a. Mauris euismod
            ex a risus pharetra lacinia.
          </Typography>
        </Alert>
      </Stack>
    </>
  );
};

export default ConnectWallet;
