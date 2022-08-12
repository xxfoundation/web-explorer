import { GET_DISPLAY_IDENTITY } from '../../../../schemas/accounts.schema';

import React, { FC } from 'react';
import { Stack } from '@mui/material';

import Address from '../../../../components/Hash/XXNetworkAddress';
import { useQuery } from '@apollo/client';
import Loading from '../../../../components/Loading';

type Props = {
  accounts: string[];
};

const AccountList: FC<Props> = ({ accounts }) => {
  // Get Identity
  const query = useQuery<{ identity: string }>(GET_DISPLAY_IDENTITY);
  const display = query.data?.identity;
  const loadingQuery = query.loading;

  return loadingQuery ? (
    <Loading />
  ) : (
    <Stack spacing={2} sx={{ overflow: 'auto', maxHeight: '10rem', width: '100%' }}>
      {accounts?.map((acct) => (
        <Address truncated='mdDown' key={acct} value={acct} name={display} />
      ))}
    </Stack>
  );
};

export default AccountList;
