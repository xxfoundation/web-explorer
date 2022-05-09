import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';
import Tag from '../../components/Tags/Tag';
import TimeAgoComponent from '../../components/TimeAgo';
import { LabelValueWithDivider, TypographyBodyBold } from './Texts';

const AccountExtraInfo: FC<{ createdDate: number; nonce: number; roles: string[] }> = ({
  createdDate,
  nonce,
  roles
}) => {
  const rolesTags = useMemo(() => {
    return roles.map((role, index) => (
      <Tag key={role} filled sx={{ marginLeft: index !== 0 ? '8px' : '0' }}>
        <Typography fontSize={'12px'} fontWeight={400}>
          {role}
        </Typography>
      </Tag>
    ));
  }, [roles]);
  return (
    <PaperStyled>
      <LabelValueWithDivider label={'created'} value={<TimeAgoComponent date={createdDate} />} />
      <LabelValueWithDivider label={'nonce'} value={nonce} marginY={'14px'} />
      <Stack direction='row' alignItems={'center'}>
        <TypographyBodyBold>role</TypographyBodyBold>
        {rolesTags}
        <InfoOutlinedIcon color='primary' sx={{ marginLeft: '8px' }} fontSize={'small'} />
      </Stack>
    </PaperStyled>
  );
};

export default AccountExtraInfo;
