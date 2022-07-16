import { Avatar, Box, Divider, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { Account } from '../../../../schemas/accounts.schema';
import Address from '../../../../components/Hash/XXNetworkAddress';
import { WithCopy } from '../../../../components/Summary';
import Socials from '../../../../components/Socials';

type Props = { account: Account };

const TextWithLabel: FC<{ label: string; text: string }> = ({ label, text }) => {
  return text ? (
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
  ) : null;
};

const Identity: FC<Props> = ({ account }) => {
  const theme = useTheme();
  const { blurb } = account.identity;
  const isValidator = account.roles.validator;
  const hasRiotOrWeb = account.identity.riot || account.identity.web;
  const avatarSx = isValidator ? { width: 125, height: 125 } : { width: 30, height: 30 };

  return (
    <Grid spacing={3} container>
      {isValidator && (
        <Grid item md={2} sx={{ mb: 2, pr: 2 }}>
          <Avatar src='' alt='avatar placeholder' sx={avatarSx} />
        </Grid>
      )}
      <Grid item md={isValidator ? 10 : 12} xs={12}>
        <Grid item container md={12} alignItems={'end'}>
          <Grid item md={12}>
            <Stack
              spacing={3}
              direction={{ sm: 'row', xs: 'column' }}
              sx={{ mb: 2 }}
              justifyContent='space-between'
            >
              <Box>
                {account.identity.legal && (
                  <Typography variant='h2' sx={{ mb: 2 }}>
                    {account.identity.legal}
                  </Typography>
                )}
                <WithCopy value={account.id}>
                  <Address
                    style={{ fontSize: 16 }}
                    truncated='mdDown'
                    offset={{ sm: 16, xs: 8 }}
                    disableUrl
                    disableAvatar={isValidator}
                    value={account.id}
                  />
                </WithCopy>
                {blurb && (
                  <Typography
                    sx={{ mt: 2 }}
                    fontSize={'16px'}
                    fontWeight={'400'}
                    color={theme.palette.grey[500]}
                    component={'p'}
                  >
                    {blurb}
                  </Typography>
                )}
              </Box>
              <Box>
                <Socials
                  sx={{ mt: account.identity.legal ? 2 : 0.75 }}
                  socials={account.identity}
                />
              </Box>
            </Stack>
            {(hasRiotOrWeb || isValidator) && <Divider sx={{ width: '100%', mt: 2 }} />}
          </Grid>
        </Grid>
        <Grid item container md={12}>
          <Grid item container md={12} spacing={{ md: 3 }}>
            {isValidator && (
              <Grid item md={8} sm={12} xs={12}>
                <TextWithLabel label='stash' text={account.id} />
                <TextWithLabel label='controller' text={account.controllerAddress} />
              </Grid>
            )}
            <Grid item md={4} sm={12} xs={12}>
              {account.identity.riot && <TextWithLabel label='riot' text={account.identity.riot} />}
              {account.identity.web && <TextWithLabel label='web' text={account.identity.web} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Identity;
