import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../components/Paper/PaperWrap.styled';
import Tag from '../../../components/Tags/Tag';
import TimeAgoComponent from '../../../components/TimeAgo';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';

const Info: FC<{ createdDate: number; nonce: number; roles: string[] }> = ({
  createdDate,
  nonce,
  roles
}) => {
  const rolesTags = useMemo(() => {
    if (!roles || !roles.length)
      return (
        <Tag filled>
          <Typography fontSize={'12px'} fontWeight={400}>
            unknown
          </Typography>
        </Tag>
      );
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
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>created</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <TimeAgoComponent date={createdDate} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader sx={{ width: '110px' }}>nonce</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>{nonce}</TypographyBody>
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
