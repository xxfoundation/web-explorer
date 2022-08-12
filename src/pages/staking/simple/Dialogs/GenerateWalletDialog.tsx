import { Dialog } from '@mui/material';
import React, { FC, useState } from 'react';

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

  return (
    <Dialog onClose={onClose} open={open} maxWidth='lg'>
      {step === 1 && <Step1 onFinish={nextStep} setMnemonics={setMnemonics} />}
      {step === 2 && <Step2 mnemonics={mnemonics} onFinish={nextStep} />}
      {step === 3 && <Step3 onFinish={onFinish} standardMnemonic={mnemonics[0]} />}
    </Dialog>
  );
};

export default GenerateWalletDialog;
