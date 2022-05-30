import React, { FC, useMemo } from 'react';
import PaperWrapStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account, Roles } from '../../../../schemas/accounts.schema';
import FullIdentity from './FullIdentity';
import ShortIdentity from './ShortIdentity';

const IdentityCard: FC<{ account: Account; roles: Roles[] }> = ({ account, roles }) => {
  const IdentityDisplay = useMemo(() => {
    if (roles.includes('validator') || roles.includes('nominator')) {
      return <FullIdentity account={account} roles={roles} />;
    }
    return <ShortIdentity account={account} />;
  }, [account, roles]);

  return (
    <PaperWrapStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      {IdentityDisplay}
    </PaperWrapStyled>
  );
};

export default IdentityCard;
