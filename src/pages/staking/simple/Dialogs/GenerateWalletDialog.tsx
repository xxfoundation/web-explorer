import { Button, Dialog } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import Close from '@mui/icons-material/Close';

import useStepper from '../../../../hooks/useStepper';
import Step1 from './GenerateWalletSteps/Step1';
import Step2 from './GenerateWalletSteps/Step2';
import Step3 from './GenerateWalletSteps/Step3';

type Props = {
  open: boolean;
  onClose: () => void;
};

const GenerateWalletDialog: FC<Props> = ({ onClose, open }) => {
  const [step, nextStep, , setStep] = useStepper();
  const [mnemonics, setMnemonics] = useState<string[]>(['', '']);

  const onFinish = () => {
    setMnemonics(['', '']);
    onClose();
    setTimeout(() => setStep(1), 200);
  };

  const cancel = useCallback(() => {
    setStep(1);
    setMnemonics(['', ''])
  }, [setStep])

  return (
    <Dialog onClose={onClose} open={open} maxWidth='lg'>
      <Button variant='text' sx={{ position: 'absolute', top: 0, right: 0 }} onClick={onClose}>
        <Close />
      </Button>
      {step === 1 && <Step1 onFinish={nextStep} setMnemonics={setMnemonics} />}
      {step === 2 && <Step2 mnemonics={mnemonics} cancel={cancel} onFinish={nextStep} />}
      {step === 3 && <Step3 onFinish={onFinish} standardMnemonic={mnemonics[0]} />}
    </Dialog>
  );
};

export default GenerateWalletDialog;
