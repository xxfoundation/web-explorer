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

const RowTwo: FC<{ account: AccountType }> = ({ account }) => {
  const socialIconsDisplay = useMemo(() => {
    const socials: Record<string, string> = {};
    if (account.email) {
      socials.email = account.email;
    }
    if (account.twitter) {
      socials.twitter = account.twitter;
    }
    return (
      (socials.twitter || socials.email) && (
        <Grid item>
          <Socials socials={socials} />
        </Grid>
      )
    );
  }, [account.email, account.twitter]);
  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {account.personalIntroduction && (
        <Grid item xs={12}>
          <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
            {account.personalIntroduction}
          </Typography>
        </Grid>
      )}
      {socialIconsDisplay}
    </>
  );
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
        <Typography fontSize={24} fontWeight={700} letterSpacing={0.5} width={'100%'}>
          {account.legalName}
        </Typography>
      </Grid>
      {!account.personalIntroduction && !account.email && !account.twitter ? (
        <></>
      ) : (
        <RowTwo account={account} />
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
          {account.name ? (
            <>
              <Typography fontSize={24} fontWeight={700} letterSpacing={0.5} width={'100%'}>
                {account.name}
              </Typography>
              <Typography fontSize={'16px'} fontWeight={'400'} component={'p'} marginY={'23px'}>
                {account.personalIntroduction}
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
