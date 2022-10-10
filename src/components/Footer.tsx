import { Button, Box, Container, Divider, Grid, Typography, styled } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';


import hub from '../assets/images/logos/xx_hub_logotype.svg';
import Socials from './Socials';
import { theme as footerTheme } from '../themes/footer';
import { theme as defaultTheme } from '../themes/default';
import { GET_RUNTIME_VERSION, RuntimeVersion } from '../schemas/chaindata.schema';
import { useQuery } from '@apollo/client';
import Link from './Link';

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

const ListLink = styled(Link)(({ theme }) => ({
  display: 'block',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  color: theme.palette.primary.contrastText,
  fontSize: 14
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: 'white',
  margin: 'auto',
  borderRadius: 11,
  padding: '1rem 0.75rem 0.75rem',
  '&:hover': {
    backgroundColor: 'rgb(255,255,255,0.8)',
  }
}));

const Footer = () => {
  const { data, loading } = useQuery<RuntimeVersion>(GET_RUNTIME_VERSION);
  const version = data?.block[0].version.toString();

  return (
    <ThemeProvider theme={footerTheme}>
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
              <StyledButton href='https://hub.xx.network'>
                <img src={hub} />
              </StyledButton>
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <ListLink to='/' underline='hover'>
                    Home
                  </ListLink>
                  <ListLink to='https://xx.network/mission/' underline='hover' rel='noopener' target='_blank'>
                    Mission
                  </ListLink>
                  <ListLink
                    to='https://xx.network/resources/'
                    underline='hover'
                    rel='noopener'
                    target='_blank'
                  >
                    Resources
                  </ListLink>
                </Grid>
                <Grid item xs> 
                  <ListLink
                    to='https://xx.network/blockchain'
                    underline='hover'
                    rel='noopener'
                    target='_blank'
                  >
                    xx blockchain
                  </ListLink>
                  <ListLink
                    to='https://xx.network/messenger/'
                    underline='hover'
                    rel='noopener'
                    target='_blank'
                  >
                    xx messenger
                  </ListLink>
                  <ListLink to='https://xx.network/welcome/' underline='hover' rel='noopener' target='_blank'>
                    xx community
                  </ListLink>
                </Grid>
                <Grid item xs={12} md='auto'>
                  <ListLink to='https://xx.network/whitepapers' underline='hover' rel='noopener' target='_blank'>
                    Whitepapers
                  </ListLink>
                  <ListLink to='https://xx.network/faq/' underline='hover' rel='noopener' target='_blank'>
                    FAQ
                  </ListLink>
                  <ListLink to='https://xx.network/contact/' underline='hover' rel='noopener' target='_blank'>
                    Contact Us
                  </ListLink>
                </Grid>
              </Grid>
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
