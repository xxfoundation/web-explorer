import React, { FC, useMemo } from 'react';
import PaperWrapStyled from '../../../../components/Paper/PaperWrap.styled';
import { AccountType } from '../../types';
import FullIdentity from './FullIdentity';
import ShortIdentity from './ShortIdentity';

const IdentityCard: FC<{ account: AccountType }> = ({ account }) => {
  const IdentityDisplay = useMemo(() => {
    if (account.roles.includes('validator') || account.roles.includes('nominator')) {
      return <FullIdentity account={account} />;
    }
    return <ShortIdentity account={account} />;
  }, [account]);

  return (
    <PaperWrapStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      {IdentityDisplay}
    </PaperWrapStyled>
  );
};

export default IdentityCard;
