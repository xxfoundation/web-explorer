import type { Roles } from '../../../schemas/accounts.schema';

import { Box, Tooltip, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { pick } from 'lodash';
import { useTranslation } from 'react-i18next';

import Tag from '../../../components/Tags/Tag';
import TimeAgoComponent from '../../../components/TimeAgo';
import { Account } from '../../../schemas/accounts.schema';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';

const roleKeys: (keyof Roles)[] = [
  'council',
  'nominator',
  'special',
  'techcommit',
  'validator'
];

const AccountDetails: FC<{ account: Account }> = ({ account }) => {
  const { t } = useTranslation();
  const roles: Roles = useMemo(
    () => pick(account, roleKeys),
    [account]
  );
  
  const rolesTags = useMemo(() => {
    return Object.entries(roles)
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
  }, [roles]);

  return (
    <>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>{t('created')}</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <TimeAgoComponent date={account.whenCreated} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <Tooltip
          title={t('Corresponds to the number of interactions that this account had with the chain (number of extrinsics).')}
          arrow
        >
          <TypographyHeader sx={{ width: '110px' }}>{t('nonce')}</TypographyHeader>
        </Tooltip>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>{account.nonce}</TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>{t('Status')}</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        {account.active ? 
        <TypographyBody>
          {t('Active')}
        </TypographyBody>
        : <TypographyBody>
          <Tag filled sx={{ marginRight: '0.75em' }}>
            <Typography fontSize={'12px'} fontWeight={400}>
              {t('Closed')}
            </Typography>
          </Tag>
          <TimeAgoComponent date={account.whenKilled} />
        </TypographyBody>}
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>{t('role')}</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <Box display={'flex'} alignItems={'center'}>
          {rolesTags.length ? rolesTags : <Typography fontWeight='100'>
            {t('N/A')}
          </Typography>}
        </Box>
      </InfoCardRow>
    </>
  );
};

export default AccountDetails;
