import type { StakingOptions } from '../SimpleStaker';

import React, { FC, useEffect, useState } from 'react';
import { BN } from '@polkadot/util';
import { Box, Button, Stack, Typography } from '@mui/material';

import FormatBalance from '../../../../components/FormatBalance';
import Loading from '../../../../components/Loading';
import Link from '../../../../components/Link';

type Props = {
  option: StakingOptions;
  amount: BN;
  account: string;
  blockHash: string;
  reset: () => void;
};

const optionToVerb: Record<StakingOptions, string> = {
  redeem: 'redeemed',
  stake: 'staked',
  unstake: 'unstaked'
};

const FinishPanel: FC<Props> = ({ account, amount, blockHash, option, reset }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

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
