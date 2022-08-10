import React from 'react';
// import { keyring } from '@polkadot/ui-keyring';
import { Button, Typography } from '@mui/material';

interface Props {
  className?: string;
  standardMnemonic: string;
  onFinish: () => void;
}

function Step3({ className = '', onFinish, standardMnemonic }: Props): React.ReactElement {
  // const wallet = keyring.addUri(standardMnemonic);

  return (
    <div className={className} style={{ margin: '1em', width: '95%' }}>
      <Typography variant='h2'>Finish Wallet Setup</Typography>
      <p>Nicely done! You are now ready to use your wallet.</p>
      <Typography variant='h3'>xx network blockchain address: {standardMnemonic}</Typography>
      <p>
        To setup a hardware wallet:{' '}
        <a className='ml-1' href='https://xxnetwork.wiki/Ledger' rel='noreferrer' target='_blank'>
          https://xxnetwork.wiki/Ledger
        </a>
      </p>
      <div style={{ textAlign: 'end' }}>
        <Button onClick={onFinish} variant='contained'>
          Done
        </Button>
      </div>
    </div>
  );
}

export default Step3;
