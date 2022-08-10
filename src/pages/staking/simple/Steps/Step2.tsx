import { Button, TextField, styled, Typography, Stack } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import useStepper from '../../../../hooks/useStepper';

const NUM_CONFIRMATIONS = 1;

interface Props {
  mnemonics: string[];
  onFinish: () => void;
}

interface MnemonicGridProps {
  mnemonic: string[];
  indexes: number[];
  onValid: () => void;
}

const getRandomSet = (array: number[], n: number): number[] => {
  const shuffled = array.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, n);
};

const MnemonicGrid = ({ indexes, mnemonic, onValid }: MnemonicGridProps): React.ReactElement => {
  const [words, setWords] = useState<string[]>(indexes.map(() => ''));

  const onSetWord = useCallback(
    (index: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      const copy = words.slice();
      copy[index] = evt.target.value;
      setWords(copy);
    },
    [words]
  );

  const isValid = useMemo(() => {
    const valid = indexes.every((elem, index) => mnemonic.indexOf(words[index]) === elem);
    return valid && words.length == indexes.length;
  }, [indexes, mnemonic, words]);

  const result = useMemo(
    () => (
      <>
        {indexes.map((idx, index) => {
          return (
            <TextField
              key={idx}
              onChange={onSetWord(index)}
              sx={{ m: 1 }}
              size='small'
              label={`Word #${idx + 1}`}
              variant='outlined'
            />
          );
        })}
      </>
    ),
    [indexes, onSetWord]
  );

  const button = useMemo(
    () => (
      <div style={{ textAlign: 'end' }}>
        <Button disabled={!isValid} onClick={onValid} variant='contained'>
          Next
        </Button>
      </div>
    ),
    [isValid, onValid]
  );

  return (
    <>
      {result}
      {button}
    </>
  );
};

function Step2({ mnemonics, onFinish }: Props): React.ReactElement {
  const [ready, setReady] = useState<boolean>(false);
  const standard = mnemonics[0].split(' ').map((elem) => elem);
  const quantum = mnemonics[1].split(' ').map((elem) => elem);

  const onSetReady = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <Stack sx={{ margin: '1em' }} spacing={2}>
      <Typography variant='h2'>Confirm Mnemonics</Typography>
      {!ready && (
        <Stack spacing={2}>
          <Typography variant='h3'>
            <b>QUANTUM</b> mnemonic
          </Typography>
          <MnemonicGrid
            indexes={getRandomSet(Array.from(Array(quantum.length).keys()), NUM_CONFIRMATIONS)}
            mnemonic={quantum}
            onValid={onSetReady}
          />
        </Stack>
      )}
      {ready && (
        <Stack spacing={2}>
          <Typography variant='h3'>
            <b>STANDARD</b> mnemonic
          </Typography>
          <MnemonicGrid
            indexes={getRandomSet(Array.from(Array(standard.length).keys()), NUM_CONFIRMATIONS)}
            mnemonic={standard}
            onValid={onFinish}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default styled(Step2)`
  .quantum {
    font-size: 20px;
    color: var(--highlight);
  }

  .standard {
    font-size: 20px;
    color: forestgreen;
  }
`;
