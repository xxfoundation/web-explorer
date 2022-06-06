import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import discordIcon from '../assets/images/icons/Discord.svg';
import emailIcon from '../assets/images/icons/Email.svg';
import telegramIcon from '../assets/images/icons/Telegram.svg';
import twitterIcon from '../assets/images/icons/Twitter.svg';
import xxNetworkLogo from '../assets/images/logos/xx-network-logo--white.svg';
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
        <Grid sx={{ mt: 2 }}>
            <Typography variant='body5'>
                xxlabs xxnetwork v0.2.0
            </Typography>
        </Grid>
        <Divider sx={{ mt: 2, mb: 3, borderColor: 'grey.600' }} />
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
              <a href='https://twitter.com/xx_network' rel='noopener'>
                <img src={twitterIcon} alt='Follow us on Twitter' />
              </a>
            </Grid>
            <Grid item xs>
              <a href='https://discord.gg/Y8pCkbK' rel='noopener'>
                <img src={discordIcon} alt='Join our Discord' />
              </a>
            </Grid>
            <Grid item xs>
              <a href='https://t.me/xxnetwork' rel='noopener'>
                <img src={telegramIcon} alt='Message us on Telegram' />
              </a>
            </Grid>
            <Grid item xs>
              <a href='https://xx.network/contact/' rel='noopener'>
                <img src={emailIcon} alt='Contact us' />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </ThemeProvider>
);
export default Footer;
