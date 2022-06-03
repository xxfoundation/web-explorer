import { Avatar, Divider, Grid, Link, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { Account } from '../../../../schemas/accounts.schema';
import SocialIconsGroup from './SocialIconsGroup';

type Props = { account: Account };

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

const NameHeaderTypography: FC<Props> = ({ account: { identity } }) => {
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

const DisplayBlurb: FC<Props> = ({ account: { identity, roles } }) => {
  if (roles.nominator || !identity.blurb) return <></>;
  return (
    <Grid item xs={12}>
      <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
        {identity.blurb}
      </Typography>
    </Grid>
  );
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
      {(!props.account.identity.blurb || props.account.roles.nominator) &&
      !props.account.identity.email &&
      !props.account.identity.twitter ? (
        <></>
      ) : (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <DisplayBlurb {...props} />
          <SocialIconsGroup identity={props.account.identity} />
        </>
      )}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} margin={'10px'}>
        {/* <TextWithLabel label='stash' text={props.account.stash} />
        <TextWithLabel label='controller' text={props.account.controller} /> */}
        {props.account.identity.riotName && (
          <TextWithLabel label='riot' text={props.account.identity.riotName} />
        )}
        {props.account.identity.web && (
          <TextWithLabel label='web' text={props.account.identity.web} />
        )}
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
    () => !props.account.roles.nominator && props.account.identity.blurb,
    [props.account.identity.blurb, props.account.roles.nominator]
  );
  if (!props.account.identityDisplay) {
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
        {props.account.identityDisplay}
      </Typography>
      {hasBlurb && (
        <Typography fontSize={'16px'} fontWeight={'400'} component={'p'}>
          {props.account.identity.blurb}
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
              <SocialIconsGroup identity={props.account.identity} />
            </Grid>
            {(props.account.identity.twitter || props.account.identity.email) && <Divider />}
          </PaddedGridItem>
        </Grid>
        <Grid item container md={12}>
          <PaddedGridItem md={8}>
            <TextWithLabel label='stash' text={props.account.id} />
          </PaddedGridItem>
          <PaddedGridItem md={4}>
            {props.account.identity.riotName && (
              <TextWithLabel label='riot' text={props.account.identity.riotName} />
            )}
          </PaddedGridItem>
        </Grid>
        <Grid item container md={12}>
          <PaddedGridItem md={8}>
            <TextWithLabel label='controller' text={props.account.controllerAddress} />
          </PaddedGridItem>
          <PaddedGridItem md={4}>
            {props.account.identity.web && (
              <TextWithLabel label='web' text={props.account.identity.web} />
            )}
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
