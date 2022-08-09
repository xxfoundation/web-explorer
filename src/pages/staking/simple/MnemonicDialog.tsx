import React, { FC, useCallback, useState } from 'react';
import { Box, Button, Dialog, TextField, Grid, Stack, Typography, Alert } from '@mui/material';
import { mnemonicValidate } from '@polkadot/util-crypto';
import { keyring } from '@polkadot/ui-keyring';

type Props = {
  open: boolean;
  onClose: (value: string[]) => void;
}

const MNEMONIC_COUNT = 24;
const inputCount = Array.from(Array(MNEMONIC_COUNT).keys()).map((i) => i);

const MnemonicDialog: FC<Props> = ({ onClose, open }) => {
  const [mnemonic, setMnemonic] = useState<string[]>(inputCount.map(() => ''));
  const [isValid, setValid] = useState(true);

  const handleClose = useCallback(() => {
    onClose(mnemonic);
  }, [mnemonic, onClose]);

  const handleDone = () => {
    const seed = mnemonic.join(' ');
    const valid = mnemonicValidate(seed);
    setValid(valid);
    if (valid) {
      keyring.addUri(seed);
      onClose(mnemonic);
    }
  };

  const mnemonicSetter = useCallback(
    (index: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      const copy = mnemonic.slice();
      const words = evt.target.value.split(' ');
      words.forEach((word, i) => {
        copy[index + i] = word;
      });
      setMnemonic(copy);
    },
    [mnemonic]
  )

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack spacing={3} sx={{ p: { md: 5, sm: 3, xs: 2 }}}>
        <Typography variant='h3'>
          Mnemonic Phrase
        </Typography>
        {!isValid && (
          <Alert severity='error'>
            Please verify that your mnemonic is correct.
          </Alert>
        )}
        <Grid container>
          {inputCount.map((i) => (
            <Grid key={i} item xs={4} sm={3} >
              <TextField
                error={!isValid}
                onChange={mnemonicSetter(i)}
                value={mnemonic[i]}
                sx={{ m: 1 }}
                size='small'
                label={`${i + 1}.`}
                variant='outlined' />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={handleDone} variant='contained'>
            Done
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}

export default MnemonicDialog;
