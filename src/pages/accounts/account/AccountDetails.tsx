import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Tag from '../../../components/Tags/Tag';
import TimeAgoComponent from '../../../components/TimeAgo';
import { Account } from '../../../schemas/accounts.schema';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';

const AccountDetails: FC<{ account: Account }> = ({ account }) => {
  const rolesTags = useMemo(() => {
    return Object.entries(account.roles)
      .filter(
        ([name, content]) =>
          name !== '__typename' && (content === true || typeof content === 'string')
      )
      .map(([role, value], index) => (
        <Tag key={role} filled sx={{ marginLeft: index !== 0 ? '8px' : '0' }}>
          <Typography fontSize={'12px'} fontWeight={400}>
            {role === 'special' ? value : role}
          </Typography>
        </Tag>
      ));
  }, [account.roles]);
  return (
    <>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>created</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <TimeAgoComponent date={account.whenCreated} />
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
          {rolesTags.length ? rolesTags : <Typography fontWeight='100'>N/A</Typography>}
        </Box>
      </InfoCardRow>
    </>
  );
};

export default AccountDetails;
