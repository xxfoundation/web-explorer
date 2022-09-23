import { Box, Divider, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { Account } from '../../../../schemas/accounts.schema';
import Address from '../../../../components/Hash/XXNetworkAddress';
import { WithCopy } from '../../../../components/Summary';
import Socials from '../../../../components/Socials';

type Props = { account: Account };

const TextWithLabel: FC<{ label: string; text: string; url?: string }> = ({ label, text, url }) => {
  return text ? (
    <>
      <Typography variant='h4' marginTop={'18.5px'} marginBottom={'3px'}>
        {label}
      </Typography>
      {url ? (
        <Link
          href={url}
          fontSize={'13px'}
          underline='none'
          sx={{ overflowX: 'hidden', wordBreak: 'break-all', width: '100%' }}
        >
          {text}
        </Link>
      ) : (
        <Typography variant='body3' fontSize={'13px'}>
          {text}
        </Typography>
      )}
    </>
  ) : null;
};

const Identity: FC<Props> = ({ account }) => {
  const theme = useTheme();
  const isStaking = account.roles.validator || account.roles.nominator;
  const hasRiotOrWeb = account.identity?.riot || account.identity?.web;
  return (
    <Grid spacing={3} container>
      <Grid item md={12} xs={12}>
        <Grid item container md={12} alignItems={'end'}>
          <Grid item md={12}>
            <Stack
              spacing={3}
              direction={{ sm: 'row', xs: 'column' }}
              sx={{ mb: 2 }}
              justifyContent='space-between'
            >
              <Box>
                {account.identity?.legal && (
                  <Typography variant='h2' sx={{ mb: 2 }}>
                    {account.identity?.legal}
                  </Typography>
                )}
                <WithCopy value={account.id}>
                  <Address
                    roles={account.roles}
                    style={{ fontSize: 16 }}
                    truncated='mdDown'
                    offset={{ sm: 16, xs: 8 }}
                    disableUrl
                    value={account.id}
                  />
                </WithCopy>
                {account.identity?.blurb && (
                  <Typography
                    sx={{ mt: 2 }}
                    fontSize={'16px'}
                    fontWeight={'400'}
                    color={theme.palette.grey[500]}
                    component={'p'}
                  >
                    {account.identity?.blurb}
                  </Typography>
                )}
              </Box>
              <Box>
                <Socials
                  sx={{ mt: account.identity?.legal ? 2 : 0.75 }}
                  socials={account.identity}
                />
              </Box>
            </Stack>
            {(hasRiotOrWeb || isStaking) && <Divider sx={{ width: '100%', mt: 2 }} />}
          </Grid>
        </Grid>
        <Grid item container md={12}>
          <Grid item container md={12} spacing={3}>
            {isStaking && (
              <Grid item md={8} sm={12} xs={12}>
                <Typography variant='h4' marginTop={'20px'} marginBottom={'5px'}>
                  Stash
                </Typography>
                <Address
                  roles={account.roles}
                  sx={{ fontSize: 12, fontWeight: 400 }}
                  truncated='smDown'
                  offset={{ xs: 16 }}
                  disableAvatar
                  value={account.id}
                />
                {account.controllerAddress && (
                  <>
                    <Typography variant='h4' marginTop={'20px'} marginBottom={'5px'}>
                      Controller
                    </Typography>
                    <Address
                      roles={account.roles}
                      sx={{ fontSize: 12, fontWeight: 400 }}
                      truncated='smDown'
                      offset={{ xs: 16 }}
                      disableAvatar
                      value={account.controllerAddress}
                    />
                  </>
                )}
              </Grid>
            )}
            <Grid item md={4} sm={12} xs={12}>
              {account.identity?.riot && (
                <TextWithLabel label='riot' text={account.identity?.riot} />
              )}
              {account.identity?.web && (
                <TextWithLabel
                  label='web'
                  text={account.identity?.web}
                  url={account.identity?.web}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Identity;
