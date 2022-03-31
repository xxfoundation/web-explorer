import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import discordIcon from '../assets/icons/Discord.svg';
import emailIcon from '../assets/icons/Email.svg';
import telegramIcon from '../assets/icons/Telegram.svg';
import twitterIcon from '../assets/icons/Twitter.svg';
import xxNetworkLogo from '../assets/logos/xx-network-logo--white.svg';
import { theme } from '../themes/footer';
import FooterMenu from './menus/Footer';

const Footer = () => (
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
        <Divider sx={{ mt: 5, mb: 3, borderColor: 'grey.600' }} />
        <Grid container justifyContent='space-between' spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant='body1'>
              xx Network does not distribute, offer, solicit sales of, or sell any xx coins in any
              state or jurisdiction in which such a distribution, offer, solicitation or sale would
              be unlawful prior to registration or qualification under the securities laws of any
              such state or jurisdiction. Copyright © 2022{' '}
              <Link href='##' color='inherit'>
                xx labs SEZC
              </Link>{' '}
              |{' '}
              <Link href='##' color='inherit'>
                Privacy Policy & Term of Use
              </Link>
            </Typography>
          </Grid>
          <Grid container item xs='auto' spacing={1.5}>
            <Grid item xs>
              <img src={twitterIcon} alt='Follow us on Twitter' />
            </Grid>
            <Grid item xs>
              <img src={discordIcon} alt='Join our Discord' />
            </Grid>
            <Grid item xs>
              <img src={telegramIcon} alt='Message us on Telegram' />
            </Grid>
            <Grid item xs>
              <img src={emailIcon} alt='Email us' />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </ThemeProvider>
);
export default Footer;
