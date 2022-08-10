import React, { useCallback, useState } from 'react';
import { keyring } from '@polkadot/ui-keyring';
import { Button, Stack, Typography } from '@mui/material';

interface Props {
  standardMnemonic: string;
  onFinish: () => void;
}

function Step3({ onFinish, standardMnemonic }: Props): React.ReactElement {
  const [address, setAddress] = useState<string>('');

  const addAccount = useCallback(() => {
    const wallet = keyring.addUri(standardMnemonic);
    setAddress(wallet.pair.address);
  }, [standardMnemonic]);

  return (
    <Stack style={{ margin: '1em' }} spacing={2}>
      <Typography variant='h2'>Finish Wallet Setup</Typography>
      <p>Nicely done! You are now ready to use your wallet.</p>
      {!address && (
        <Button onClick={addAccount} variant='contained'>
          Add address to this Web App
        </Button>
      )}
      {address && (
        <Stack spacing={0}>
          <Typography variant='body3'>
            <b>xx network blockchain address</b>
          </Typography>
          <Typography variant='body3'>{address}</Typography>
        </Stack>
      )}
      <Typography variant='body4'>
        To setup a hardware wallet:{' '}
        <a className='ml-1' href='https://xxnetwork.wiki/Ledger' rel='noreferrer' target='_blank'>
          https://xxnetwork.wiki/Ledger
        </a>
      </Typography>
      <div style={{ textAlign: 'end' }}>
        <Button onClick={onFinish} variant='contained'>
          Done
        </Button>
      </div>
    </Stack>
  );
}

export default Step3;
