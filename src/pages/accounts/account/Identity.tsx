import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack, Typography
} from '@mui/material';
import React, { FC } from 'react';
import { PaperStyled } from '../../../components/Paper/PaperWrap.styled';
import { theme } from '../../../themes/default';
import { AccountType } from '../types';

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

const ContactIcons: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <>
      {(account.twitter || account.email) && (
        <Grid item>
          <Stack direction={'row'} spacing={2} marginY={'23px'}>
            {account.twitter && (
              <CustomIconButton href={`https://twitter.com/${account.twitter}`}>
                <TwitterIcon fontSize='small' />
              </CustomIconButton>
            )}
            {account.email && (
              <CustomIconButton href={`mailto:${account.email}`}>
                <EmailIcon fontSize='small' />
              </CustomIconButton>
            )}
          </Stack>
        </Grid>
      )}
    </>
  );
};

const IdentitySummary: FC<{ account: AccountType }> = ({ account }) => {
  if (!account.personalIntroduction && !account.email && !account.twitter) {
    return <></>;
  }
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
      <ContactIcons account={account} />
    </>
  );
};

const AccountIdentityMobile: FC<{ account: AccountType }> = ({ account }) => {
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
          {account.name}
        </Typography>
      </Grid>
      <IdentitySummary account={account} />
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

const AccountIdentityDesktop: FC<{ account: AccountType }> = ({ account }) => {
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
          <ContactIcons account={account} />
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

const AccountIdentity: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <PaperStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      <AccountIdentityMobile account={account} />
      <AccountIdentityDesktop account={account} />
    </PaperStyled>
  );
};

export default AccountIdentity;
