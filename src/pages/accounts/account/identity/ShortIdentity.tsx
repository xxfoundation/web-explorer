import {
  Avatar,
  Box,
  Divider,
  Grid,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import CopyButton from '../../../../components/buttons/CopyButton';
import { Account } from '../../../../schemas/accounts.schema';
import SocialIconsGroup from './SocialIconsGroup';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

const IdentityMobile: FC<{ account: Account }> = ({ account }) => {
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
                  <Typography variant='body5'>{account.id}</Typography>
                  <CopyButton value={account.id} />
                </Stack>
              }
              placement='top'
              arrow
            >
              <span>
                <CopyButton value={account.id} />
              </span>
            </CustomWidthTooltip>
            {/* <Tooltip title={`public key: ${publicKey}`} arrow placement='top'>
              <KeyIcon color='primary' sx={{ transform: 'rotate(90deg)' }} />
            </Tooltip> */}
          </Box>
        </Stack>
      </Stack>
      <Box>
        <SocialIconsGroup identity={account.identity} />
      </Box>
    </Stack>
  );
};

const IdentityDesktop: FC<{ account: Account }> = ({ account }) => {
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
                <Typography variant='body5'>{account.id}</Typography>
                <CopyButton value={account.id} />
              </Stack>
            }
            placement='top'
            arrow
          >
            <span>
              <CopyButton value={account.id} />
            </span>
          </CustomWidthTooltip>
          {/* <Tooltip title={`public key: ${publicKey}`} arrow placement='top'>
            <KeyIcon color='primary' sx={{ transform: 'rotate(90deg)' }} />
          </Tooltip> */}
        </Stack>
      </Grid>
      <Grid item md={4} container justifyContent={'flex-end'}>
        <SocialIconsGroup identity={account.identity} />
      </Grid>
    </Grid>
  );
};

const ShortIdentity: FC<{ account: Account }> = ({ account }) => {
  return (
    <>
      <IdentityMobile account={account} />
      <IdentityDesktop account={account} />
    </>
  );
};

export default ShortIdentity;
