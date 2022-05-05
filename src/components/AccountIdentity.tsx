import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../themes/default';
import { PaperStyled } from './Paper/PaperWrap.styled';

type AccountIdentifyType = {
  address: string;
  name?: string;
  personalIntroduction?: string;
  stash: string;
  controller: string;
  email?: string;
  twitter?: string;
  riotID?: string;
  website?: string;
};

const fakeIdentify: AccountIdentifyType = {
  name: 'Daniel Jacobus Greeff',
  personalIntroduction:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices aliquet est ac consequat. Quisque tincidunt tellus at dapibus lacinia. Etiam gravida pulvinar vestibulum.',
  address: '6a7YefNJArBVBBVzdMdJ5V4giafmBdfhwi7DiAcxseKA2zbt',
  stash: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
  controller: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
  riotID: '@jacogr:matrix.parity.io',
  website: 'http://github/jacobgr',
  email: 'test@elixxir.io',
  twitter: 'xx_network'
};

const TextWithLabel: FC<{ label: string; text: string }> = ({ label, text }) => {
  return (
    <>
      <Typography variant='h4' marginTop={'20px'} marginBottom={'5px'}>
        {label}
      </Typography>
      <Link
        href={'#'}
        underline='none'
        sx={{ overflowX: 'hidden', wordBreak: 'break-all', width: '100%' }}
      >
        {text}
      </Link>
    </>
  );
};

const IdentifySummary: FC<{ identity: AccountIdentifyType }> = ({ identity }) => {
  if (!identity.personalIntroduction && !identity.email && !identity.twitter) {
    return <></>;
  }
  return (
    <>
      <Grid item xs={12}>
        <Divider flexItem variant='fullWidth' orientation='horizontal' />
      </Grid>
      {identity.personalIntroduction && (
        <Grid item xs={12}>
          <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
            {identity.personalIntroduction}
          </Typography>
        </Grid>
      )}
      {(identity.twitter || identity.email) && (
        <Grid item>
          <Stack direction={'row'} spacing={2} marginY={'13px'}>
            {identity.twitter && (
              <IconButton
                size='small'
                sx={{ background: theme.palette.primary.main, color: 'white' }}
                href={`https://twitter.com/${identity.twitter}`}
                target={'_blank'}
              >
                <TwitterIcon fontSize='small' />
              </IconButton>
            )}
            {identity.email && (
              <IconButton
                size='small'
                sx={{ background: theme.palette.primary.main, color: 'white' }}
                href={`mailto:${identity.email}`}
                target={'_blank'}
              >
                <EmailIcon fontSize='small' />
              </IconButton>
            )}
          </Stack>
        </Grid>
      )}
    </>
  );
};

const AccountIdentify: FC<{ ID: string }> = ({}) => {
  return (
    <PaperStyled>
      <Grid container spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Grid
          item
          xs={12}
          container
          flexDirection={'row'}
          flexWrap={'nowrap'}
          alignItems={'center'}
          mb={'16px'}
          mt={'5px'}
        >
          <Avatar src='' alt='something I do not know' sx={{ width: 125, height: 125 }} />
          <Typography
            fontSize={24}
            fontWeight={700}
            letterSpacing={0.5}
            marginLeft='15px'
            width={'100%'}
          >
            {fakeIdentify.name}
          </Typography>
        </Grid>
        <IdentifySummary identity={fakeIdentify} />
        <Grid item xs={12}>
          <Divider flexItem variant='fullWidth' orientation='horizontal' />
        </Grid>
        <Grid item xs={12} margin={'10px'}>
          <TextWithLabel label='stash' text={fakeIdentify.stash} />
          <TextWithLabel label='controller' text={fakeIdentify.controller} />
          {fakeIdentify.riotID && <TextWithLabel label='riot' text={fakeIdentify.riotID} />}
          {fakeIdentify.website && <TextWithLabel label='web' text={fakeIdentify.website} />}
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

export default AccountIdentify;
