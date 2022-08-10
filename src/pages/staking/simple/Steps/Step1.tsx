import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

// import { Button, Checkbox, MarkWarning } from '@polkadot/react-components';
import { bip39Generate, generateSleeve, waitReady } from '@polkadot/wasm-crypto';
import { Alert, Button, Checkbox, FormControlLabel, Paper, Stack, Typography } from '@mui/material';
import { theme } from '../../../../themes/default';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';

interface ElementProps {
  className?: string;
  header: string;
  value: string;
  body?: string;
}

const Element = ({ body, className = '', header, value }: ElementProps): JSX.Element => (
  <PaperStyled sx={{ margin: '1em 0' }}>
    <b>{header}</b>
    {body && <p style={{ color: 'black' }}>{body}</p>}
    <div style={{ display: 'flex', flexFlow: 'wrap' }}>
      {value &&
        value.split(' ').map((elem, index) => {
          return (
            <Alert icon={index + 1} key={index} sx={{ margin: '0.25em', alignItems: 'center' }}>
              {elem}
            </Alert>
          );
        })}
    </div>
  </PaperStyled>
);

interface Props {
  className?: string;
  setMnemonics: (mnemonics: string[]) => void;
  onFinish: () => void;
}

function Step1({ className = '', onFinish, setMnemonics }: Props): React.ReactElement {
  const [ackOnlineRisk, setAckOnlineRisk] = useState<boolean>(false);
  const [ackBrowserRisk, setIAckBrowserRisk] = useState<boolean>(false);
  const [isMnemonicSaved, setIsMnemonicSaved] = useState<boolean>(false);
  const [standardMnemonic, setStandardMnemonic] = useState<string>('');
  const [quantumMnemonic, setQuantumMnemonic] = useState<string>('');
  const isStepValid = !!standardMnemonic && !!quantumMnemonic && isMnemonicSaved;

  const toggleMnemonicSaved = useCallback(
    () => setIsMnemonicSaved(!isMnemonicSaved),
    [isMnemonicSaved]
  );

  const toggleOnlineCheckbox = useCallback(() => setAckOnlineRisk(!ackOnlineRisk), [ackOnlineRisk]);
  const toggleBrowserCheckbox = useCallback(
    () => setIAckBrowserRisk(!ackBrowserRisk),
    [ackBrowserRisk]
  );

  const [online, isOnline] = useState(navigator.onLine);

  const setOnline = () => {
    console.warn('You are online!');
    isOnline(true);
  };

  const setOffline = () => {
    console.warn('You are offline!');
    isOnline(false);
  };

  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    };
  }, []);

  const generateWallet = useCallback(async () => {
    // first wait until the WASM has been loaded (async init)
    await waitReady();

    // generate quantum seed
    const quantum: string = bip39Generate(24);

    // generate standard seed
    const standard = generateSleeve(quantum);

    setQuantumMnemonic(quantum);
    setStandardMnemonic(standard);
    setMnemonics([standard, quantum]);
  }, [setMnemonics]);

  return (
    <Stack direction='column' sx={{ margin: '1em', width: '95%' }} spacing={2}>
      <Stack direction='row' sx={{ margin: '0.5em 1.25em 0' }} spacing={1.75}>
        {online ? <span>&#128994;</span> : <span>&#128308;</span>}
        <Typography variant='body2'>You are {online ? 'Online' : 'Offline'}!</Typography>
      </Stack>
      <Alert severity='warning'>
        We advise you to turn off your internet connection and bluetooth until the end of the wallet
        generation process. This process runs completely on your browser, which means there is no
        need for internet connectivity. Furthermore, do not proceed if you think your browser might
        be compromised with malicious software.
      </Alert>
      <FormControlLabel
        control={<Checkbox checked={ackOnlineRisk} onChange={toggleOnlineCheckbox} />}
        label={
          <Typography variant='body3' sx={{ lineHeight: '1.5', marginLeft: '0.5em' }}>
            I acknowledge that I have turned off internet connectivity, or that I understand the
            risks of remaining connected.
          </Typography>
        }
      />
      <FormControlLabel
        control={<Checkbox checked={ackBrowserRisk} onChange={toggleBrowserCheckbox} />}
        label={
          <Typography variant='body3' sx={{ lineHeight: '1.5', marginLeft: '0.5em' }}>
            I acknowledge that I am accessing this web page through a non compromised browser.
          </Typography>
        }
      />
      <Button
        disabled={!ackOnlineRisk || !ackBrowserRisk}
        onClick={generateWallet}
        variant='contained'
      >
        Generate New Wallet
      </Button>
      {quantumMnemonic && (
        <Element
          body='This recovery phrase will only be used when the xx network consensus adopts quantum-secure ignatures. Your standard recovery phrase is generated from this'
          className='quantum'
          header='Quantum Mnemonic'
          value={quantumMnemonic}
        />
      )}
      {standardMnemonic && (
        <Element
          body='This recovery phrase is used like any other cryptocurrency recovery phrase. If you lose your wallet or you want to setup a hardware wallet, you can recreate it using this recovery phrase.'
          className='standard'
          header='Standard Mnemonic'
          value={standardMnemonic}
        />
      )}
      <div style={{ margin: '1em 1em' }}>
        <section className='mb-3'>
          <p>
            <strong>NOT RECOMMENDED</strong>
          </p>
          <ul>
            <li>Taking a screenshot or photo of this information</li>
            <li>Saving the information in an unencrypted text document</li>
            <li>
              Sharing this information with any person or application you do not trust with your
              money
            </li>
          </ul>
        </section>
        <section className='mb-3'>
          <p>
            <strong>RECOMMENDED</strong>
          </p>
          <ul>
            <li>
              Writing down on paper both recovery phrases, with the correct label, and indexes
            </li>
            <li>Keeping this information somewhere that is safe from theft and damage</li>
            <li>Using a hardware wallet</li>
          </ul>
        </section>
        <p>
          <strong>
            To learn more about our quantum-ready wallets:{' '}
            <a className='ml-1' href='https://github.com/xx-labs/sleeve'>
              https://github.com/xx-labs/sleeve
            </a>
          </strong>
        </p>
      </div>
      {standardMnemonic && quantumMnemonic && (
        <div style={{ textAlign: 'right' }}>
          <FormControlLabel
            control={<Checkbox checked={isMnemonicSaved} onChange={toggleMnemonicSaved} />}
            label={'I have saved both my mnemonics safely and named them correctly!'}
          />
        </div>
      )}
      <div style={{ marginTop: '1.5em', textAlign: 'end' }}>
        <Button disabled={!isStepValid} onClick={onFinish} variant='contained'>
          Next
        </Button>
      </div>
    </Stack>
  );
}

export default styled(Step1)`
  .quantum {
    border-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.main};
  }

  .standard {
    border-color: forestgreen;
    color: forestgreen;
  }
`;
