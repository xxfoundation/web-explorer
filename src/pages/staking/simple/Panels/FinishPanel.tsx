import type { StakingOptions } from '../SimpleStaker';

import React, { FC } from 'react';
import { BN } from '@polkadot/util';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';

import FormatBalance from '../../../../components/FormatBalance';
import Loading from '../../../../components/Loading';
import Link from '../../../../components/Link';

type Props = {
  option: StakingOptions;
  amount: BN;
  error?: string;
  account: string;
  blockHash: string;
  loading: boolean;
  reset: () => void;
};

const optionToVerb: Record<StakingOptions, string> = {
  redeem: 'redeemed',
  stake: 'staked',
  unstake: 'unstaked'
};

const FinishPanel: FC<Props> = ({ account, amount, blockHash, error, loading, option, reset }) => {
  if (loading) {
    return (
      <Stack spacing={4} sx={{ p: 3, textAlign: 'center' }}>
        <Loading size='md' />
        <Typography variant='body3' sx={{ mt: 2, fontSize: '1.25rem' }}>
          Combobulating the ol' blockchain
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <>
        <Stack spacing={4} sx={{ pb: 10, textAlign: 'center' }}>
          <Alert severity='error'>
            {error}
          </Alert>
        </Stack>
        <Box sx={{ textAlign: 'right' }}>
          <Button onClick={reset} variant='contained'>
            Go back
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Stack spacing={4}>
      <Typography variant='h2'>Extrinsic Submitted Successfully</Typography>
      <Typography variant='body3' sx={{ fontSize: '1rem' }}>
        Congratulations! You've successfully{' '}
        <b>
          {optionToVerb[option]}
          &nbsp;
          <FormatBalance value={amount} />
        </b>
        .
      </Typography>
      <Typography variant='body3' sx={{ fontSize: '1rem' }}>
        See it in all its glory over <Link to={`/blocks/${blockHash}`}>here</Link>.
      </Typography>
      <Typography variant='body3' sx={{ fontSize: '1rem' }}>
        And/or check your account <Link to={`/accounts/${account}`}>here</Link>.
      </Typography>
      <Box sx={{ p: 4 }} />
      <Box sx={{ textAlign: 'right' }}>
        <Button onClick={reset} variant='contained'>
          Do it again?
        </Button>
      </Box>
    </Stack>
  );
};

export default FinishPanel;
