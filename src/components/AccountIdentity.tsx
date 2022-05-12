import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../themes/default';
import PaperStyled from './Paper/PaperWrap.styled';

type AccountIdentityType = {
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

const fakeIdentity: AccountIdentityType = {
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

const CustomIconButton: FC<{ href: string }> = ({ children, href }) => {
  return (
    <IconButton
      size='small'
      sx={{
        background: theme.palette.primary.main,
        color: 'white',
        ['&:hover']: {
          color: 'white',
          background: theme.palette.primary.main
        }
      }}
      href={href}
      target={'_blank'}
    >
      {children}
    </IconButton>
  );
};

const ContactIcons: FC<{ identity: AccountIdentityType }> = ({ identity }) => {
  return (
    <>
      {(identity.twitter || identity.email) && (
        <Grid item>
          <Stack direction={'row'} spacing={2} marginY={'23px'}>
            {identity.twitter && (
              <CustomIconButton href={`https://twitter.com/${identity.twitter}`}>
                <TwitterIcon fontSize='small' />
              </CustomIconButton>
            )}
            {identity.email && (
              <CustomIconButton href={`mailto:${identity.email}`}>
                <EmailIcon fontSize='small' />
              </CustomIconButton>
            )}
          </Stack>
        </Grid>
      )}
    </>
  );
};

const IdentitySummary: FC<{ identity: AccountIdentityType }> = ({ identity }) => {
  if (!identity.personalIntroduction && !identity.email && !identity.twitter) {
    return <></>;
  }
  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {identity.personalIntroduction && (
        <Grid item xs={12}>
          <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
            {identity.personalIntroduction}
          </Typography>
        </Grid>
      )}
      <ContactIcons identity={identity} />
    </>
  );
};

const AccountIdentityMobile: FC<{ identity: AccountIdentityType }> = ({ identity }) => {
  return (
    <Grid container spacing={2} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
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
        <Avatar
          src=''
          alt='something I do not know'
          sx={{ width: 125, height: 125, marginRight: '15px' }}
        />
        <Typography fontSize={24} fontWeight={700} letterSpacing={0.5} width={'100%'}>
          {identity.name}
        </Typography>
      </Grid>
      <IdentitySummary identity={identity} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} margin={'10px'}>
        <TextWithLabel label='stash' text={identity.stash} />
        <TextWithLabel label='controller' text={identity.controller} />
        {identity.riotID && <TextWithLabel label='riot' text={identity.riotID} />}
        {identity.website && <TextWithLabel label='web' text={identity.website} />}
      </Grid>
    </Grid>
  );
};

const PaddedGridItem: FC<{ md: number }> = ({ children, md }) => {
  return (
    <Grid item md={md} sx={{ padding: '0 20px' }}>
      {children}
    </Grid>
  );
};

const AccountIdentityDesktop: FC<{ identity: AccountIdentityType }> = ({ identity }) => {
  return (
    <Grid container md={12} sx={{ display: { xs: 'none', sm: 'none', md: 'inherit' } }}>
      <Grid item container md={12} minHeight={'50px'} alignItems={'end'}>
        <Grid item md={2}>
          <Avatar
            src=''
            alt='avatar placeholder'
            sx={{ width: 125, height: 125, margin: '0 auto' }}
          />
        </Grid>
        <PaddedGridItem md={8}>
          {identity.name ? (
            <>
              <Typography fontSize={24} fontWeight={700} letterSpacing={0.5} width={'100%'}>
                {identity.name}
              </Typography>
              <Typography fontSize={'16px'} fontWeight={'400'} component={'p'} marginY={'23px'}>
                {identity.personalIntroduction}
              </Typography>
            </>
          ) : (
            <Typography
              fontSize={24}
              fontWeight={700}
              fontStyle={'italic'}
              letterSpacing={0.5}
              width={'100%'}
              marginY={'23px'}
              sx={{ opacity: 0.7 }}
            >
              no identify
            </Typography>
          )}
          <Divider />
        </PaddedGridItem>
        <PaddedGridItem md={2}>
          <ContactIcons identity={identity} />
          {(identity.twitter || identity.email) && <Divider />}
        </PaddedGridItem>
      </Grid>
      <Grid item container md={12}>
        <PaddedGridItem md={2} />
        <PaddedGridItem md={8}>
          <TextWithLabel label='stash' text={identity.stash} />
        </PaddedGridItem>
        <PaddedGridItem md={2}>
          {identity.riotID && <TextWithLabel label='riot' text={identity.riotID} />}
        </PaddedGridItem>
      </Grid>
      <Grid item container md={12}>
        <PaddedGridItem md={2} />
        <PaddedGridItem md={8}>
          <TextWithLabel label='controller' text={identity.controller} />
        </PaddedGridItem>
        <PaddedGridItem md={2}>
          {identity.website && <TextWithLabel label='web' text={identity.website} />}
        </PaddedGridItem>
      </Grid>
    </Grid>
  );
};

const AccountIdentity: FC<{ ID: string }> = ({}) => {
  return (
    <PaperStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      <AccountIdentityMobile identity={fakeIdentity} />
      <AccountIdentityDesktop identity={fakeIdentity} />
    </PaperStyled>
  );
};

export default AccountIdentity;
