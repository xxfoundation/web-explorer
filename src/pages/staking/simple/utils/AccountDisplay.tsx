import { GetDisplayIdentity, GET_DISPLAY_IDENTITY } from '../../../../schemas/accounts.schema';
import React, { FC } from 'react';
import Address from '../../../../components/Hash/XXNetworkAddress';
import { useQuery } from '@apollo/client';
import Loading from '../../../../components/Loading';
import { BN } from '@polkadot/util';

type Props = {
  account: string;
  balance?: BN;
  targetBlank?: boolean;
};

const AccountDisplay: FC<Props> = ({ account, balance, targetBlank = false }) => {
  const {data, loading} = useQuery<GetDisplayIdentity>(GET_DISPLAY_IDENTITY, { variables: { account }});
  const display = data?.identity && data?.identity.length && data?.identity[0].display || undefined;
  const roles = data?.identity && data?.identity.length && data?.identity[0].account.roles || {};

  const loadingQuery = loading;

  return loadingQuery ? (
    <Loading size='xs'/>
  ) : (
    balance ? 
    <Address roles={roles} truncated='mdDown' targetBlank={targetBlank} value={account} name={display} 
        disableUrl={balance.eqn(0)}
        disableAvatar={balance.eqn(0)} />
    : <Address roles={roles}  truncated='mdDown' targetBlank={targetBlank} value={account} name={display} />
  );
};

export default AccountDisplay;