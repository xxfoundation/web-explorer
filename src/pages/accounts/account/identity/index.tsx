import React, { FC, useMemo } from 'react';
import PaperWrapStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account } from '../../../../schemas/accounts.schema';
import FullIdentity from './FullIdentity';
import ShortIdentity from './ShortIdentity';

const IdentityCard: FC<{ account: Account }> = ({ account }) => {
  const IdentityDisplay = useMemo(() => {
    if (account.roles.validator || account.roles.nominator) {
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
