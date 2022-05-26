import React, { FC, useMemo } from 'react';
import PaperWrapStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account } from '../../../../schemas/accounts.schema';
import { Identity } from '../../types';
import FullIdentity from './FullIdentity';
import ShortIdentity from './ShortIdentity';

const IdentityCard: FC<{ account: Account }> = ({ account }) => {
  const IdentityDisplay = useMemo(() => {
    const identity: Identity = account.identity ? JSON.parse(account.identity) : {};
    const roles = account.roles || [];
    if (roles.includes('validator') || roles.includes('nominator')) {
      return <FullIdentity account={account} identity={identity} />;
    }
    return <ShortIdentity account={account} identity={identity} />;
  }, [account]);

  return (
    <PaperWrapStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      {IdentityDisplay}
    </PaperWrapStyled>
  );
};

export default IdentityCard;
