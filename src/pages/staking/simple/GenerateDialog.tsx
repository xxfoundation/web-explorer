import { Dialog } from '@mui/material';
import React, { FC, useState } from 'react';

import useStepper from '../../../hooks/useStepper';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

type Props = {
  open: boolean;
  onClose: () => void;
};

const GenerateDialog: FC<Props> = ({ onClose, open }) => {
  const [step, nextStep] = useStepper();
  const [mnemonics, setMnemonics] = useState<string[]>(['', '']);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth='sm'>
      {step === 1 && <Step1 onFinish={nextStep} setMnemonics={setMnemonics} />}
      {step === 2 && <Step2 mnemonics={mnemonics} onFinish={nextStep} />}
      {step === 3 && <Step3 onFinish={onClose} standardMnemonic={mnemonics[0]} />}
    </Dialog>
  );
};

export default GenerateDialog;
