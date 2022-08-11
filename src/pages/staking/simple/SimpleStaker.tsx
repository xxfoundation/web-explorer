import type { WithChildren } from '../../../types';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import PaperWrap from '../../../components/Paper/PaperWrap.styled';
import { Box, Tabs, Tab, TabProps, Stack } from '@mui/material';

import ActionSelection from './StakingOptionsPanel';
import ConnectWallet from './ConnectWalletPanel';
import WalletSelection from './WalletSelectionPanel';
import AmountSelection from './AmountPanel';
import FinishPanel from './FinishPanel';
import NavButtons, { NavProps } from './NavButtons';
import useAccounts from '../../../hooks/useAccounts';
import { BN_ZERO } from '@polkadot/util';
import APYPanel from './APYPanel';

const selectedValidators: string[] = [];

type PanelProps = WithChildren &
  NavProps & {
    currentStep: number;
    step: number;
  };

const Panel: FC<PanelProps> = ({ children, currentStep, step, ...navProps }) => {
  return (
    <div
      style={{ flexGrow: 1 }}
      role='tabpanel'
      hidden={step !== currentStep}
      id={`vertical-tabpanel-${step}`}
      aria-labelledby={`vertical-tab-${step}`}
    >
      {step === currentStep && (
        <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
          {children}
          {step < 5 && <NavButtons {...navProps} />}
        </Box>
      )}
    </div>
  );
};

const makeTabProps =
  (validSteps: Record<number, boolean>, currentStep: number) =>
  (index: number): TabProps => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      disabled: currentStep !== index && !validSteps[index],
      sx: {
        px: { sm: 3, md: 5 },
        backgroundColor: 'grey.100',
        '&.Mui-selected': {
          backgroundColor: 'background.paper',
          borderColor: 'grey.200',
          borderWidth: '1px',
          borderStyle: 'solid'
        }
      }
    };
  };

const MAX_STEPS = 6;
export type StakingOptions = 'stake' | 'unstake' | 'redeem';

const VerticalTabs = () => {
  const accounts = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedStakingOption, setSelectedStakingOption] = useState<StakingOptions>();
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(BN_ZERO);
  const [amountIsValid, setAmountIsValid] = useState(false);

  const reset = useCallback(() => {
    setSelectedAccount('');
    setSelectedStakingOption(undefined);
    setStep(0);
    setAmount(BN_ZERO);
    setAmountIsValid(false);
  }, []);

  useEffect(() => {
    if (selectedAccount && !accounts.allAccounts.includes(selectedAccount)) {
      setSelectedAccount('');
    }
  }, [accounts.allAccounts, selectedAccount]);

  const validSteps = useMemo<Record<number, boolean>>(
    () => ({
      0: true,
      1: accounts.hasAccounts,
      2: !!selectedAccount,
      3: accounts.hasAccounts && !!selectedAccount && !!selectedStakingOption,
      4: amountIsValid
    }),
    [accounts.hasAccounts, amountIsValid, selectedAccount, selectedStakingOption]
  );

  const next = useCallback(() => {
    setStep((v) => Math.min(MAX_STEPS - 1, v + 1));
  }, []);

  const back = useCallback(() => {
    setStep((v) => Math.max(0, v - 1));
  }, []);

  const onStepChange = useCallback(
    (evt: React.SyntheticEvent, value: number) => {
      const i = Number(value);
      if (validSteps[i]) {
        setStep(i);
      }
    },
    [validSteps]
  );

  const panelProps = useCallback(
    (index: number, confirmStep?: boolean): PanelProps => ({
      confirmStep,
      onNext: next,
      canNext: !!validSteps[index + 1],
      onBack: index > 0 ? back : undefined,
      canBack: !!validSteps[index - 1],
      step: index,
      currentStep: step
    }),
    [back, next, step, validSteps]
  );

  const tabProps = useMemo(() => makeTabProps(validSteps, step), [step, validSteps]);

  return (
    <Stack direction='row' sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        orientation='vertical'
        value={step}
        aria-label='Simple Staking Stepper'
        onChange={onStepChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          display: { xs: 'none', sm: 'flex' },
          flex: '0 0 fit-content'
        }}
      >
        <Tab label='Connect Wallet' {...tabProps(0)} />
        <Tab label='Select Wallet' {...tabProps(1)} />
        <Tab label='Staking Options' {...tabProps(2)} />
        <Tab label='Input Amount' {...tabProps(3)} />
        <Tab label='Nominate' {...tabProps(4)} />
        <Tab label='Finish' {...tabProps(5)} />
      </Tabs>
      <Panel {...panelProps(0)}>
        <ConnectWallet />
      </Panel>
      <Panel {...panelProps(1)}>
        <WalletSelection onSelect={setSelectedAccount} selected={selectedAccount} />
      </Panel>
      <Panel {...panelProps(2)}>
        <ActionSelection selected={selectedStakingOption} onSelect={setSelectedStakingOption} />
      </Panel>
      <Panel {...panelProps(3)}>
        <AmountSelection
          account={selectedAccount}
          amount={amount}
          option={selectedStakingOption}
          setAmount={setAmount}
          setAmountIsValid={setAmountIsValid}
        />
      </Panel>
      <Panel {...panelProps(4, true)}>
        <APYPanel amount={amount} selectedValidators={selectedValidators} />
      </Panel>
      <Panel {...panelProps(5)}>
        <FinishPanel
          account={selectedAccount}
          amount={amount}
          option={selectedStakingOption as StakingOptions}
          reset={reset}
        />
      </Panel>
    </Stack>
  );
};

const SimpleStaker = () => {
  return (
    <PaperWrap sx={{ p: { xs: 0, sm: 0, md: 0 }, overflow: 'hidden' }}>
      <VerticalTabs />
    </PaperWrap>
  );
};

export default SimpleStaker;
