import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import xxNetworkLogo from '../assets/images/logos/xx-network-logo--white.svg';
import Socials from './Socials';
import { theme } from '../themes/footer';
import { theme as defaultTheme } from '../themes/default';
import FooterMenu from './menus/Footer';
import { GET_RUNTIME_VERSION, RuntimeVersion } from '../schemas/chaindata.schema';
import { useQuery } from '@apollo/client';

const VERSION_LENGTH = 6;
const RELEASE_URL = 'https://github.com/xx-labs/xxchain/releases/tag/';

// * Example: 203 => 00 02 03 => v0.2.3
const runtimeVersion = (data: string) => {
  const padding = data.padStart(VERSION_LENGTH, '0');
  const step = VERSION_LENGTH / 3;

  const version = `v${parseInt(padding.slice(0, step))}.${parseInt(
    padding.slice(step, 2 * step)
  )}.${parseInt(padding.slice(2 * step, 3 * step))}`;

  const link = RELEASE_URL + version;

  return (
    <Link
      target='_blank'
      rel='noopener'
      href={link}
      underline='hover'
      variant='body1'
      color={defaultTheme.palette.primary.main}
    >
      xxlabs xxnetwork {version}
    </Link>
  );
};

const Footer = () => {
  const { data, loading } = useQuery<RuntimeVersion>(GET_RUNTIME_VERSION);
  const version = data?.block[0].version.toString();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: 'background.default'
        }}
      >
        <Container
          sx={{
            py: 6,
            px: { xs: 3, md: 6 },
            color: 'text.primary'
          }}
        >
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} md='auto' sx={{ mb: 2 }}>
              <img src={xxNetworkLogo} alt='xx network' />
            </Grid>
            <Grid item xs={12} md={5}>
              <FooterMenu />
            </Grid>
          </Grid>
          {!loading && version && (
            <Grid sx={{ mt: 2 }}>
              <Typography variant='body5'>{runtimeVersion(version)}</Typography>
            </Grid>
          )}
          <Divider sx={{ mt: 2, mb: 3, borderColor: 'grey.600' }} />
          <Grid container justifyContent='space-between' spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant='body1'>
                xx Network does not distribute, offer, solicit sales of, or sell any xx coins in any
                state or jurisdiction in which such a distribution, offer, solicitation or sale
                would be unlawful prior to registration or qualification under the securities laws
                of any such state or jurisdiction. Copyright © 2022 xx labs SEZC |{' '}
                <Link
                  href='https://xx.network/privacy-policy'
                  color='inherit'
                  rel='noopener'
                  target='_blank'
                >
                  Privacy Policy & Term of Use
                </Link>
              </Typography>
            </Grid>
            <Grid item padding={'1rem 0'}>
              <Socials
                socials={{
                  twitter: 'xx_network',
                  github: 'xx-labs',
                  telegram: 'xxnetwork',
                  discord: 'Y8pCkbK'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default Footer;
