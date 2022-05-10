import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { PaperStyled } from '../../../components/Paper/PaperWrap.styled';
import Tag from '../../../components/Tags/Tag';
import TimeAgoComponent from '../../../components/TimeAgo';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';

const Summary: FC<{ createdDate: number; nonce: number; roles: string[] }> = ({
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
      <InfoCardRow sx={{ paddingY: '4px' }}>
        <TypographyHeader sx={{ width: '110px' }}>created</TypographyHeader>
        <TypographyBody>
          <TimeAgoComponent date={createdDate} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow sx={{ paddingY: '4px' }}>
        <TypographyHeader sx={{ width: '110px' }}>nonce</TypographyHeader>
        <TypographyBody>{nonce}</TypographyBody>
      </InfoCardRow>
      <Stack sx={{ paddingY: '4px' }} direction={'row'} spacing={3} alignItems={'center'}>
        <TypographyHeader sx={{ width: '110px' }}>role</TypographyHeader>
        <Box display={'flex'} alignItems={'center'}>
          {rolesTags}
          <InfoOutlinedIcon color='primary' sx={{ marginLeft: '8px' }} fontSize={'small'} />
        </Box>
      </Stack>
    </PaperStyled>
  );
};

export default Summary;
