import BN from 'bn.js';
import React, { FC } from 'react';
import FormatBalance from '../../components/FormatBalance';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';
import { LabelValueWithDivider } from './Texts';

const AccountBalance: FC<{ balance: string | BN; reserved: string | BN; locked: string | BN }> = ({
  balance,
  locked,
  reserved
}) => {
  return (
    <PaperStyled>
      <LabelValueWithDivider label={'balance'} value={<FormatBalance value={balance} />} />
      <LabelValueWithDivider
        label={'reserved'}
        value={<FormatBalance value={reserved} />}
        marginY={'14px'}
      />
      <LabelValueWithDivider label={'locked'} value={<FormatBalance value={locked} />} />
    </PaperStyled>
  );
};

export default AccountBalance;
