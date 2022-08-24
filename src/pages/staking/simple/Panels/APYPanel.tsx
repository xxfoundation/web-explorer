import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  Link,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { BN, BN_ZERO } from '@polkadot/util';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { keyring } from '@polkadot/ui-keyring';
import ValidatorList from '../utils/AccountList';
import FormatBalance from '../../../../components/FormatBalance';
import { useToggle } from '../../../../hooks';
import { getStakedReturn } from '../../StakingMetrics';
import { useQuery } from '@apollo/client';
import { Economics, LISTEN_FOR_ECONOMICS } from '../../../../schemas/economics.schema';
import { StakingBalances, stake } from '../../../../simple-staking/actions';
import useApi from '../../../../hooks/useApi';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import Loading from '../../../../components/Loading';
import useInput from '../../../../hooks/useInput';
import { selectValidators } from '../../../../simple-staking/selection';

const AmountDisplay = styled(Typography)(({ theme }) => ({
  lineHeight: 1,
  paddingBottom: theme.spacing(0.75),
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  textAlign: 'right',
  justifyContent: 'center',
  borderBottom: 'solid darkgrey 1px',
  fontWeight: 400,
  fontSize: '1rem'
}));

const { href: walletUrl } = new URL('/#/staking/actions', process.env.REACT_APP_WALLET_URL ?? '');

type Props = {
  amount: BN;
  account: string;
  stakingOption: string;
  stakingBalances?: StakingBalances;
  setTransaction: (tx: Promise<SubmittableExtrinsic<'promise', ISubmittableResult>>) => void;
  setPassword: (password: string) => void;
};

const APYPanel: FC<Props> = ({
  account,
  amount,
  setPassword,
  setTransaction,
  stakingBalances,
  stakingOption
}) => {
  const [dialogOpened, dialog] = useToggle();
  const [expandValidators, validators] = useToggle();
  const { api } = useApi();
  const endIcon = useMemo(
    () => (expandValidators ? <KeyboardArrowUp /> : <KeyboardArrowDown />),
    [expandValidators]
  );
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [selectedValidators, setSelectedValidators] = useState<string[]>(['']);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [inputPassword, setInputPassword] = useInput('');

  // Get APY
  const query = useQuery<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = query.data?.economics[0];
  const loadingQuery = query.loading;
  const apy = economics ? getStakedReturn(economics) : 0;
  const xxPerEra = useMemo(
    () =>
      (stakingBalances?.staked || BN_ZERO)
        .add(amount)
        .muln(apy / 100)
        .divn(365),
    [amount, apy, stakingBalances?.staked]
  );

  // Unlock account
  const checkPassword = useCallback((): void => {
    setError(null);
    setLoadingPassword(true);
    setTimeout((): void => {
      try {
        const pair = keyring.getPair(account);
        pair.decodePkcs8(inputPassword);
        setPassword(inputPassword);
        setReady(true);
        setLoadingPassword(false);
      } catch (err) {
        setLoadingPassword(false);
        setError('Decoding failed, double check your password.');
      }
    }, 0);
  }, [account, inputPassword, setPassword]);

  const getValidator = useCallback(async () => {
    if (!api) {
      return undefined;
    }
    const targets = await selectValidators(api, account);
    setSelectedValidators(targets.map((validator) => validator.validatorId));
  }, [account, api]);

  // Create Transaction
  useEffect(() => {
    if (api && stakingBalances && stakingOption === 'stake') {
      getValidator();
      setTransaction(stake(api, account, amount, selectedValidators));
    }
  }, [
    account,
    amount,
    api,
    getValidator,
    selectedValidators,
    setTransaction,
    stakingBalances,
    stakingOption
  ]);

  return (
    <>
      <Dialog open={dialogOpened} onClose={dialog.toggleOff}>
        <Button
          variant='text'
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={dialog.toggleOff}
        >
          <Close />
        </Button>
        <Stack spacing={3} sx={{ p: { md: 5, sm: 3, xs: 2 } }}>
          <Typography variant='h3'>Validator Selection</Typography>
          <Typography variant='body3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Typography>
        </Stack>
      </Dialog>
      <Stack spacing={4}>
        <Typography variant='h2'>Nominate</Typography>
        <Typography variant='body3'>
          If you wish to maximize your returns, use this app on a regular basis to reselect your validators.
          The following APY and staking rewards estimates are not guaranteed and can change every day.
        </Typography>
        <Stack spacing={3} direction='row' sx={{ justifyContent: 'center' }}>
          <Stack>
            <Typography sx={{ lineHeight: 1.25, fontSize: '1.5rem' }} variant='h3'>
              ~APY:
            </Typography>
            <Typography sx={{ lineHeight: 1.25, fontSize: '1rem' }} variant='body2'>
              for stake of
            </Typography>
            <Typography sx={{ lineHeight: 1.25, fontSize: '1rem' }} variant='body2'>
              <FormatBalance value={(stakingBalances?.staked || BN_ZERO).add(amount)} />
            </Typography>
          </Stack>
          {loadingQuery ? (
            <Loading size='md' />
          ) : (
            <Stack spacing={2} sx={{ pt: 0.2 }}>
              <AmountDisplay variant='body2'>
                {apy.toFixed(2)}
                <b>%</b>
              </AmountDisplay>
              <AmountDisplay variant='body2'>
                <FormatBalance value={xxPerEra} precision={4} />
                /era
              </AmountDisplay>
            </Stack>
          )}
        </Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='body3'>
            We have automatically selected validators for you.
          </Typography>
          <Button onClick={validators.toggle} endIcon={endIcon}>
            Show validators
          </Button>
        </Stack>
        {expandValidators && selectedValidators && <ValidatorList accounts={selectedValidators} />}
        <Alert severity='info'>
          <AlertTitle sx={{ fontSize: '1rem', mb: 1 }}>Do you want more control?</AlertTitle>
          <Typography variant='body3'>
            You can use the{' '}
            <Link target='__blank' href={walletUrl}>
              wallet
            </Link>{' '}
            webapp to manually select validators.
          </Typography>
        </Alert>
        <Stack spacing={1}>
          <Typography variant='body3' sx={{ textAlign: 'end' }}>
            Insert password to unlock your wallet
          </Typography>
          <Stack direction='row' justifyContent='end' spacing={2}>
            <Box>
              <TextField
                type='password'
                label='Password'
                size='small'
                value={inputPassword}
                onChange={setInputPassword}
              />
            </Box>
            <Button disabled={ready} onClick={checkPassword} variant='contained'>
              {loadingPassword ? 'Confirming...' : 'Confirm Password'}
            </Button>
          </Stack>
          {error && <Alert severity='error'>{error}</Alert>}
          {!error && ready && <Alert severity='success'>Password confirmed!</Alert>}
        </Stack>
      </Stack>
    </>
  );
};

export default APYPanel;
