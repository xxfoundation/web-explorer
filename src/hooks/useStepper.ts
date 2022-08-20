/* eslint-disable @typescript-eslint/no-shadow */
// Copyright 2017-2022 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useMemo, useState } from 'react';

type Result = [number, () => void, () => void, (step: number) => void];

const useStepper = (): Result => {
  const [step, setStep] = useState(1);

  const nextStep = useCallback(
    () => setStep((step) => step + 1),
    []
  );

  const prevStep = useCallback(
    () => setStep((step) => step - 1),
    []
  );

  return useMemo(
    () => [step, nextStep, prevStep, setStep],
    [step, nextStep, prevStep, setStep]
  );
}

export default useStepper;
