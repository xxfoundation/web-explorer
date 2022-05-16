import { Avatar, Divider, Grid, Link, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Socials from '../../../../components/Socials';
import { AccountType } from '../../types';

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

const NameHeaderTypography: FC<{ account: AccountType }> = ({ account }) => {
  if (!account.name) {
    return (
      <Typography
        fontSize={24}
        fontWeight={700}
        fontStyle={'italic'}
        letterSpacing={0.5}
        width={'100%'}
        sx={{ opacity: 0.7 }}
      >
        no identify
      </Typography>
    );
  }
  return (
    <Typography fontSize={24} fontWeight={700} letterSpacing={0.5} width={'100%'}>
      {account.name}
    </Typography>
  );
};

const DisplayBlurb: FC<{ account: AccountType }> = ({ account }) => {
  if (account.roles.includes('nominator') || !account.personalIntroduction) return <></>;
  return (
    <Grid item xs={12}>
      <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
        {account.personalIntroduction}
      </Typography>
    </Grid>
  );
};

const SocialIconsGroup: FC<{ account: AccountType }> = ({ account }) => {
  const socials: Record<string, string> = {};
  if (account.email) {
    socials.email = account.email;
  }
  if (account.twitter) {
    socials.twitter = account.twitter;
  }
  if (socials.twitter || socials.email) {
    return (
      <Grid item>
        <Socials socials={socials} />
      </Grid>
    );
  }
  return <></>;
};

const IdentityMobile: FC<{ account: AccountType }> = ({ account }) => {
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
        <NameHeaderTypography account={account} />
      </Grid>
      {(!account.personalIntroduction || account.roles.includes('nominator')) &&
      !account.email &&
      !account.twitter ? (
        <></>
      ) : (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <DisplayBlurb account={account} />
          <SocialIconsGroup account={account} />
        </>
      )}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} margin={'10px'}>
        <TextWithLabel label='stash' text={account.stash} />
        <TextWithLabel label='controller' text={account.controller} />
        {account.riotID && <TextWithLabel label='riot' text={account.riotID} />}
        {account.website && <TextWithLabel label='web' text={account.website} />}
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

const NameAndBlurbCell: FC<{ account: AccountType }> = ({ account }) => {
  const hasBlurb = useMemo(
    () => !account.roles.includes('nominator') && account.personalIntroduction,
    [account.personalIntroduction, account.roles]
  );
  if (!account.name) {
    return (
      <Typography
        fontSize={24}
        fontWeight={700}
        fontStyle={'italic'}
        letterSpacing={0.5}
        width={'100%'}
        sx={{ opacity: 0.7 }}
      >
        no identify
      </Typography>
    );
  }
  return (
    <>
      <Typography fontSize={24} fontWeight={700} letterSpacing={0.5} width={'100%'}>
        {account.name}
      </Typography>
      {hasBlurb && (
        <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
          {account.personalIntroduction}
        </Typography>
      )}
    </>
  );
};

const IdentityDesktop: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <Grid container sx={{ display: { xs: 'none', sm: 'none', md: 'inherit' } }}>
      <Grid item container md={12} minHeight={'50px'} alignItems={'end'}>
        <Grid item md={2}>
          <Avatar
            src=''
            alt='avatar placeholder'
            sx={{ width: 125, height: 125, margin: '0 auto' }}
          />
        </Grid>
        <PaddedGridItem md={8}>
          <NameAndBlurbCell account={account} />
          <Divider sx={{ marginTop: '12px' }} />
        </PaddedGridItem>
        <PaddedGridItem md={2}>
          <Grid item>
            <Socials
              socials={{
                email: account.email || '#blash',
                twitter: account.twitter || '#blah'
              }}
            />
          </Grid>
          {(account.twitter || account.email) && <Divider />}
        </PaddedGridItem>
      </Grid>
      <Grid item container md={12}>
        <PaddedGridItem md={2} />
        <PaddedGridItem md={8}>
          <TextWithLabel label='stash' text={account.stash} />
        </PaddedGridItem>
        <PaddedGridItem md={2}>
          {account.riotID && <TextWithLabel label='riot' text={account.riotID} />}
        </PaddedGridItem>
      </Grid>
      <Grid item container md={12}>
        <PaddedGridItem md={2} />
        <PaddedGridItem md={8}>
          <TextWithLabel label='controller' text={account.controller} />
        </PaddedGridItem>
        <PaddedGridItem md={2}>
          {account.website && <TextWithLabel label='web' text={account.website} />}
        </PaddedGridItem>
      </Grid>
    </Grid>
  );
};

const FullIdentity: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <>
      <IdentityMobile account={account} />
      <IdentityDesktop account={account} />
    </>
  );
};

export default FullIdentity;
