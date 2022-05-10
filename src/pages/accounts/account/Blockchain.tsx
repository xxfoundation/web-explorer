import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { PaperStyled } from '../../../components/Paper/PaperWrap.styled';
import { Roles } from '../types';

const AccountBlockchain: FC<{ role: Roles }> = ({ role }) => {
  return (
    <PaperStyled>
      <Typography>blockchain card for {role}</Typography>
    </PaperStyled>
  );
};

export default AccountBlockchain;
