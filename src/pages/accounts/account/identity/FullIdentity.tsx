import { Avatar, Divider, Grid, Link, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Socials from '../../../../components/Socials';
import { Account } from '../../../../schemas/accounts.schema';
import { Identity } from './types';

type Props = { account: Account; identity: Identity };

const TextWithLabel: FC<{ label: string; text: string }> = ({ label, text }) => {
  return (
    <>
      <Typography variant='h4' marginTop={'20px'} marginBottom={'5px'}>
        {label}
      </Typography>
      <Link
        href={'#'}
        fontSize={'13px'}
        underline='none'
        sx={{ overflowX: 'hidden', wordBreak: 'break-all', width: '100%' }}
      >
        {text}
      </Link>
    </>
  );
};

const NameHeaderTypography: FC<Omit<Props, 'account'>> = ({ identity }) => {
  if (!identity.legal) {
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
      {identity.legal}
    </Typography>
  );
};

const DisplayBlurb: FC<Props> = ({ account, identity }) => {
  if ((account.roles || []).includes('nominator') || !identity.blurb) return <></>;
  return (
    <Grid item xs={12}>
      <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
        {identity.blurb}
      </Typography>
    </Grid>
  );
};

const SocialIconsGroup: FC<Omit<Props, 'account'>> = ({ identity }) => {
  const socials: Record<string, string> = {};
  if (identity.email) {
    socials.email = identity.email;
  }
  if (identity.twitter) {
    socials.twitter = identity.twitter;
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

const IdentityMobile: FC<Props> = (props) => {
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
        <NameHeaderTypography {...props} />
      </Grid>
      {(!props.identity.blurb || (props.account.roles || []).includes('nominator')) &&
      !props.identity.email &&
      !props.identity.twitter ? (
        <></>
      ) : (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <DisplayBlurb {...props} />
          <SocialIconsGroup {...props} />
        </>
      )}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} margin={'10px'}>
        {/* <TextWithLabel label='stash' text={props.account.stash} />
        <TextWithLabel label='controller' text={props.account.controller} /> */}
        {props.identity.riotName && <TextWithLabel label='riot' text={props.identity.riotName} />}
        {props.identity.web && <TextWithLabel label='web' text={props.identity.web} />}
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

const NameAndBlurbCell: FC<Props> = (props) => {
  const hasBlurb = useMemo(
    () => !(props.account.roles || []).includes('nominator') && props.identity.blurb,
    [props.account.roles, props.identity.blurb]
  );
  if (!props.identity.legal) {
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
        {props.identity.legal}
      </Typography>
      {hasBlurb && (
        <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
          {props.identity.blurb}
        </Typography>
      )}
    </>
  );
};

const IdentityDesktop: FC<Props> = (props) => {
  return (
    <Grid container sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
      <Grid item md={2}>
        <Avatar
          src=''
          alt='avatar placeholder'
          sx={{ width: 125, height: 125, margin: '0 auto' }}
        />
      </Grid>
      <Grid item md={10}>
        <Grid item container md={12} alignItems={'end'}>
          <PaddedGridItem md={8}>
            <NameAndBlurbCell {...props} />
            <Divider sx={{ marginTop: '12px' }} />
          </PaddedGridItem>
          <PaddedGridItem md={4}>
            <Grid item>
              <Socials
                socials={{
                  email: props.identity.email || '#blash',
                  twitter: props.identity.twitter || '#blah'
                }}
              />
            </Grid>
            {(props.identity.twitter || props.identity.email) && <Divider />}
          </PaddedGridItem>
        </Grid>
        <Grid item container md={12}>
          <PaddedGridItem md={8}>
            <TextWithLabel label='stash' text={'????'} />
          </PaddedGridItem>
          <PaddedGridItem md={4}>
            {props.identity.riotName && <TextWithLabel label='riot' text={props.identity.riotName} />}
          </PaddedGridItem>
        </Grid>
        <Grid item container md={12}>
          <PaddedGridItem md={8}>
            <TextWithLabel label='controller' text={'????'} />
          </PaddedGridItem>
          <PaddedGridItem md={4}>
            {props.identity.web && <TextWithLabel label='web' text={props.identity.web} />}
          </PaddedGridItem>
        </Grid>
      </Grid>
    </Grid>
  );
};

const FullIdentity: FC<Props> = (props) => {
  return (
    <>
      <IdentityMobile {...props} />
      <IdentityDesktop {...props} />
    </>
  );
};

export default FullIdentity;
