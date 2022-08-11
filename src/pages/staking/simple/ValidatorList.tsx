import type { Account } from '../../../schemas/accounts.schema';

import React, { FC } from 'react';
import { Stack } from '@mui/material';

import Address from '../../../components/Hash/XXNetworkAddress';

type Props = {
  accounts: Account[];
};

const ValidatorList: FC<Props> = ({ accounts }) => (
  <Stack spacing={2} sx={{ overflow: 'auto', maxHeight: '10rem', width: '100%' }}>
    {accounts?.map((acct) => (
      <Address
        truncated='mdDown'
        key={acct.id}
        value={acct.id}
        name={acct.identity?.display}
      />
    ))}
  </Stack>
);

export default ValidatorList;
