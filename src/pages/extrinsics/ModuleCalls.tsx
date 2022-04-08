import { Info } from '@mui/icons-material';
import { Box, Breadcrumbs, Stack, Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';
import Tag from '../../components/Tags/Tag';

type Modules = 'balance';
type Calls = 'transfers';

const balancesTransfersDescription = (
  <Box>
    <Typography variant='caption'>BALANCES / TRANSFER</Typography>
    <Typography paragraph>Transfer some liquid free balance to another account.</Typography>

    <Typography paragraph>
      ‘Transfer’ will set the ‘Free Balance’ of the sender and receiver. It will decrease the total
      issuance of the system by the ‘TransferFee.’
    </Typography>

    <Typography paragraph>
      If the sender’s account is below the existential deposit Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et{' '}
    </Typography>

    <Typography paragraph>
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur.{' '}
    </Typography>
  </Box>
);

const BalanceCallsDescriptions: Record<Modules, Record<Calls, JSX.Element>> = {
  balance: {
    transfers: balancesTransfersDescription
  }
};

const ModuleCalls: FC<{ module: Modules; call: Calls }> = ({ call, module }) => {
  return (
    <Breadcrumbs separator='/'>
      <Stack direction={'row'} spacing={1} alignItems='center'>
        <Tag filled>{module}</Tag>
        <Tag>{call}</Tag>
        {/* TODO replace it when is mobile */}
        <Tooltip title={BalanceCallsDescriptions[module][call]} arrow>
          <Info color='primary' />
        </Tooltip>
      </Stack>
    </Breadcrumbs>
  );
};

export default ModuleCalls;
