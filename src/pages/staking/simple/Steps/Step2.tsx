import { Button, TextField, styled } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import useStepper from '../../../../hooks/useStepper';

const NUM_CONFIRMATIONS = 1;

interface Props {
  className?: string;
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

function Step2({ className = '', mnemonics, onFinish }: Props): React.ReactElement {
  const [step, nextStep] = useStepper();
  const standard = mnemonics[0].split(' ').map((elem) => elem);
  const quantum = mnemonics[1].split(' ').map((elem) => elem);

  return (
    <div className={className} style={{ margin: '1em', width: '95%' }}>
      <h2>Confirm Mnemonics</h2>
      {step === 1 && (
        <div style={{ margin: '1.5em 0' }}>
          <p className='quantum'>
            <b>QUANTUM</b> mnemonic
          </p>
          <MnemonicGrid
            indexes={getRandomSet(Array.from(Array(quantum.length).keys()), NUM_CONFIRMATIONS)}
            mnemonic={quantum}
            onValid={nextStep}
          />
        </div>
      )}
      {step === 2 && (
        <div style={{ margin: '1.5em 0' }}>
          <p className='standard'>
            <b>STANDARD</b> mnemonic
          </p>
          <MnemonicGrid
            indexes={getRandomSet(Array.from(Array(standard.length).keys()), NUM_CONFIRMATIONS)}
            mnemonic={standard}
            onValid={onFinish}
          />
        </div>
      )}
    </div>
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
