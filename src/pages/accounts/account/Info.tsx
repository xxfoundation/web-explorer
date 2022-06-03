import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../components/Paper/PaperWrap.styled';
import Tag from '../../../components/Tags/Tag';
import TimeAgoComponent from '../../../components/TimeAgo';
import { Account } from '../../../schemas/accounts.schema';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';

const Info: FC<{ account: Account }> = ({ account }) => {
  const rolesTags = useMemo(() => {
    return Object.entries(account.roles).map(([role, active], index) => (
      <Tag hidden={!active} key={role} filled sx={{ marginLeft: index !== 0 ? '8px' : '0' }}>
        <Typography fontSize={'12px'} fontWeight={400}>
          {role}
        </Typography>
      </Tag>
    ));
  }, [account.roles]);
  return (
    <PaperStyled>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>created</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <TimeAgoComponent date={account.timestamp} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>nonce</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>{account.nonce}</TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>role</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <Box display={'flex'} alignItems={'center'}>
          {rolesTags}
        </Box>
      </InfoCardRow>
    </PaperStyled>
  );
};

export default Info;
