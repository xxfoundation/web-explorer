import React, { FC } from 'react';
import PaperWrapStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account } from '../../../../schemas/accounts.schema';
import Identity from './Identity';

const IdentityCard: FC<{ account: Account }> = ({ account }) => {
  return (
    <PaperWrapStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      <Identity account={account} />
    </PaperWrapStyled>
  );
};

export default IdentityCard;
