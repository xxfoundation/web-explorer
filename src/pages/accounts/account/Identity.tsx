import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyIcon from '@mui/icons-material/Key';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  styled,
  SvgIcon,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import discordIcon from '../../../assets/images/icons/Discord.svg';
import CopyButton from '../../../components/buttons/CopyButton';
import PaperStyled from '../../../components/Paper/PaperWrap.styled';
import { theme } from '../../../themes/default';
import { AccountType } from '../types';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

const CustomIconButton: FC<{ href: string }> = ({ children, href }) => {
  return (
    <IconButton
      size='small'
      sx={{
        margin: '0 2px',
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

const IdentityDesktop: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <Grid container sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
      <Grid item md={8}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Avatar sx={{ marginRight: '10px' }} />
          <Typography
            sx={{
              maxWidth: '100%',
              textOverflow: 'unset',
              overflow: 'hidden',
              wordBreak: 'break-all'
            }}
          >
            {account.id}
          </Typography>
          <Divider variant='middle' orientation='vertical' flexItem />
          <CustomWidthTooltip
            title={
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Typography variant='body5'>{account.address}</Typography>
                <CopyButton value={account.address} />
              </Stack>
            }
            placement='top'
            arrow
          >
            <span>
              <CopyButton value={account.address} />
            </span>
          </CustomWidthTooltip>
          <Tooltip title={`public key: ${account.publicKey}`} arrow placement='top'>
            <KeyIcon color='primary' sx={{ transform: 'rotate(90deg)' }} />
          </Tooltip>
        </Stack>
      </Grid>
      <Grid item md={4} sx={{ textAlign: 'end' }}>
        <CustomIconButton href='#'>
          <SvgIcon component={GitHubIcon} />
        </CustomIconButton>
        <CustomIconButton href='#'>
          <SvgIcon component={TwitterIcon} />
        </CustomIconButton>
        <CustomIconButton href='#'>
          <TelegramIcon />
        </CustomIconButton>
        <CustomIconButton href='#'>
          <img src={discordIcon} />
        </CustomIconButton>
      </Grid>
    </Grid>
  );
};

const IdentityMobile: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <Stack
      sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
      spacing={1}
      divider={<Divider />}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={3}>
        <Avatar sx={{ marginRight: '10px' }} />
        <Stack divider={<Divider />} spacing={1}>
          <Typography
            sx={{
              maxWidth: '100%',
              textOverflow: 'unset',
              overflow: 'hidden',
              wordBreak: 'break-all'
            }}
          >
            {account.id}
          </Typography>
          <Box alignItems={'center'} justifyContent={'start'} display='flex'>
            <CustomWidthTooltip
              title={
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <Typography variant='body5'>{account.address}</Typography>
                  <CopyButton value={account.address} />
                </Stack>
              }
              placement='top'
              arrow
            >
              <span>
                <CopyButton value={account.address} />
              </span>
            </CustomWidthTooltip>
            <Tooltip title={`public key: ${account.publicKey}`} arrow placement='top'>
              <KeyIcon color='primary' sx={{ transform: 'rotate(90deg)' }} />
            </Tooltip>
          </Box>
        </Stack>
      </Stack>
      <Box paddingTop={'10px'}>
        <CustomIconButton href='#'>
          <SvgIcon component={GitHubIcon} />
        </CustomIconButton>
        <CustomIconButton href='#'>
          <SvgIcon component={TwitterIcon} />
        </CustomIconButton>
        <CustomIconButton href='#'>
          <TelegramIcon />
        </CustomIconButton>
        <CustomIconButton href='#'>
          <img src={discordIcon} />
        </CustomIconButton>
      </Box>
    </Stack>
  );
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

const ValidatorIdentityMobile: FC<{ account: AccountType }> = ({ account }) => {
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

const ValidatorIdentityDesktop: FC<{ account: AccountType }> = ({ account }) => {
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
        <PaddedGridItem md={7}>
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
        <PaddedGridItem md={3}>
          <ContactIcons account={account} />
          {(account.twitter || account.email) && <Divider />}
        </PaddedGridItem>
      </Grid>
      <Grid item container md={12}>
        <PaddedGridItem md={2} />
        <PaddedGridItem md={7}>
          <TextWithLabel label='stash' text={account.stash} />
        </PaddedGridItem>
        <PaddedGridItem md={3}>
          {account.riotID && <TextWithLabel label='riot' text={account.riotID} />}
        </PaddedGridItem>
      </Grid>
      <Grid item container md={12}>
        <PaddedGridItem md={2} />
        <PaddedGridItem md={7}>
          <TextWithLabel label='controller' text={account.controller} />
        </PaddedGridItem>
        <PaddedGridItem md={3}>
          {account.website && <TextWithLabel label='web' text={account.website} />}
        </PaddedGridItem>
      </Grid>
    </Grid>
  );
};

const Identity: FC<{ account: AccountType }> = ({ account }) => {
  return (
    <PaperStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
      {account.roles.includes('validator') ? (
        <>
          <ValidatorIdentityMobile account={account} />
          <ValidatorIdentityDesktop account={account} />
        </>
      ) : (
        <>
          <IdentityMobile account={account} />
          <IdentityDesktop account={account} />
        </>
      )}
    </PaperStyled>
  );
};

export default Identity;
