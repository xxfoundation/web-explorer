import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import PaperWrap from '../../../components/Paper/PaperWrap.styled';
import { Box, Tabs, Tab, TabProps, Stack } from '@mui/material';

import ConnectWallet from './ConnectWallet';
import WalletSelection from './WalletSelection';
import useAccounts from '../../../hooks/useAccounts';
import NavButtons, { NavProps } from './NavButtons';
import ActionSelection from './ActionSelection';

type PanelProps = NavProps & {
  currentStep: number;
  step: number;
};

const Panel: FC<PanelProps & NavProps> = ({ children, currentStep, step, ...navProps }) => {
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
          <NavButtons {...navProps} />
        </Box>
      )}
    </div>
  );
};

const tabProps = (index: number): TabProps => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
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

const MAX_STEPS = 5;
export type StakingOptions = 'stake' | 'unstake' | 'redeem';

const VerticalTabs = () => {
  const accounts = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedStakingOption, setSelectedStakingOption] = useState<StakingOptions>();
  const [step, setStep] = useState(0);

  const validSteps = useMemo<Record<number, boolean>>(
    () => ({
      0: true,
      1: accounts.hasAccounts,
      2: !!selectedAccount
    }),
    [accounts.hasAccounts, selectedAccount]
  );

  const next = useCallback(() => {
    setStep((v) => Math.min(MAX_STEPS - 1, v + 1));
  }, []);

  const back = useCallback(() => {
    setStep((v) => Math.max(0, v - 1));
  }, []);

  const onChange = useCallback(
    (evt: React.SyntheticEvent, value: any) => {
      const i = Number(value);
      if (validSteps[i]) {
        setStep(i);
      }
    },
    [validSteps]
  );

  const panelProps = useCallback(
    (index: number): PanelProps => ({
      onNext: index < MAX_STEPS ? next : undefined,
      canNext: !!validSteps[index + 1],
      onBack: index > 0 ? back : undefined,
      canBack: !!validSteps[index - 1],
      step: index,
      currentStep: step
    }),
    [back, next, step, validSteps]
  );

  useEffect(() => {
    if (selectedStakingOption) {
      next();
    }
  }, [next, selectedStakingOption]);

  return (
    <Stack direction='row' sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        orientation='vertical'
        value={step}
        aria-label='Simple Staking Stepper'
        onChange={onChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          display: { xs: 'none', sm: 'flex' },
          flex: '0 0 fit-content'
        }}
      >
        <Tab label='Connect Wallet' {...tabProps(0)} />
        <Tab label='Step 02' {...tabProps(1)} />
        <Tab label='Step 03' {...tabProps(2)} />
        <Tab label='Step 04' {...tabProps(3)} />
        <Tab label='Step 05' {...tabProps(4)} />
      </Tabs>
      <Panel {...panelProps(0)}>
        <ActionSelection onSelect={setSelectedStakingOption} />
      </Panel>
      <Panel {...panelProps(1)}>
        <WalletSelection onSelect={setSelectedAccount} selected={selectedAccount} />
      </Panel>
      <Panel {...panelProps(2)}>Item Three</Panel>
      <Panel {...panelProps(3)}>Item Four</Panel>
      <Panel {...panelProps(4)}>Item Five</Panel>
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
