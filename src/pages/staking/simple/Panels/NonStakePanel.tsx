import {
  Alert,
  AlertTitle,
  Button,
  Box,
  Link,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { BN } from '@polkadot/util';
import React, { FC, useCallback, useEffect, useState } from 'react';

import FormatBalance from '../../../../components/FormatBalance';
import { StakingBalances, unstake, redeem } from '../../../../simple-staking/actions';
import useApi from '../../../../hooks/useApi';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import useInput from '../../../../hooks/useInput';
import keyring from '@polkadot/ui-keyring';

const AmountDisplay = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  paddingBottom: theme.spacing(0.75),
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  textAlign: 'right',
  borderBottom: 'solid darkgrey 1px',
  fontWeight: 400,
  fontSize: '1.25rem'
}));

type Props = {
  amount: BN;
  account: string;
  stakingOption: string;
  stakingBalances?: StakingBalances;
  setTransaction: (tx: Promise<SubmittableExtrinsic<'promise', ISubmittableResult>>) => void;
  setPassword: (password: string) => void;
};

const NonStakePanel: FC<Props> = ({
  account,
  amount,
  setPassword,
  setTransaction,
  stakingBalances,
  stakingOption
}) => {
  const { api } = useApi();
  const accountURL = `/accounts/${account}`;
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [inputPassword, setInputPassword] = useInput('');

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

  // Create Transaction
  useEffect(() => {
    if (api && stakingBalances && stakingOption === 'unstake') {
      setTransaction(unstake(api, account, amount));
    }
    if (api && stakingBalances && stakingOption === 'redeem') {
      setTransaction(redeem(api, account));
    }
  }, [account, amount, api, setTransaction, stakingBalances, stakingOption]);

  return (
    <>
      <Stack spacing={4}>
        <Typography variant='h2'>Sign and Submit</Typography>
        <Typography variant='body3'>
          {stakingOption === 'unstake'
            ? 'Please remember that the unstaking process takes 28 days. Furthermore, coins will be kept locked until you redeem them. You can unlock your coins using the Redeem option on this app, after waiting for 28 days.'
            : 'You are redeeming the full amount of coins that were previously unstaked.'}
        </Typography>
        <Stack spacing={3} direction='row'>
          <Typography sx={{ lineHeight: 1.25, fontSize: '1.5rem' }} variant='h3'>
            {stakingOption === 'unstake' ? 'Amount to unstake:' : 'Amount to redeem:'}
          </Typography>
          <Stack spacing={2} sx={{ pt: 0.25 }}>
            <AmountDisplay variant='body3'>
              <FormatBalance value={amount} />
            </AmountDisplay>
          </Stack>
        </Stack>
        <Alert severity='info'>
          <AlertTitle sx={{ fontSize: '1rem', mb: 1 }}>
            Do you want to view your account?
          </AlertTitle>
          <Typography variant='body3'>
            You can monitor your account activity on the{' '}
            <Link target='__blank' href={accountURL}>
              explorer
            </Link>
            .
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
          {!error && ready && <Alert severity='success'>Password confimed!</Alert>}
        </Stack>
      </Stack>
    </>
  );
};

export default NonStakePanel;
