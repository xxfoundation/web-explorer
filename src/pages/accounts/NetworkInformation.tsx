import { Box, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import discordIcon from '../../assets/images/icons/Discord.svg';
import telegramIcon from '../../assets/images/icons/Telegram.svg';
import twitterIcon from '../../assets/images/icons/Twitter.svg';
import xxnetworkCircleLogo from '../../assets/images/logos/xx-network-circle-logo.svg';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';

const SummaryInfo = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={1}>
          <Divider variant='middle' orientation='vertical' />
        </Grid>
        <Grid item xs={4} md={3}>
          <Stack>
            <Typography variant='subtitle1'>decimals</Typography>
            <Typography variant='subtitle2'>9</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4} md={3}>
          <Stack>
            <Typography variant='subtitle1'>holders</Typography>
            <Typography variant='subtitle2'>100,765</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4} md={3}>
          <Stack>
            <Typography variant='subtitle1'>transfers</Typography>
            <Typography variant='subtitle2'>894,765</Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

const NetworkIcon = () => {
  return (
    <Box
      sx={{
        background: '#08CDD7',
        width: '114px',
        height: '114px',
        borderRadius: '90px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img
        src={xxnetworkCircleLogo}
        width='39px'
        height='39px'
        style={{ margin: 'auto' }}
        alt='xxnetwork logo'
      />
    </Box>
  );
};

// const LinkBehavior = (link: string) => {
//   return React.forwardRef<never, Omit<LinkProps, 'to'>>((props, ref) => (
//     <Link ref={ref} href={link} target={'_blank'} {...props} />
//   ));
// };

const ContactInfo = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>XX</Typography>
      </Grid>
      <Grid item xs={12}>
        <Link target={'_blank'} href='https://xx.network'>
          https://xx.network
        </Link>
      </Grid>
      <Grid item>
        <Stack direction={'row'}>
          <img src={telegramIcon} />
          <img src={twitterIcon} />
          {/* <img src={githubIcon} /> TODO add proper github icon resource */}
          <img src={discordIcon} />
        </Stack>
      </Grid>
    </Grid>
  );
};

const NetworkInformation: FC = () => {
  return (
    <PaperStyled>
      <Grid container>
        <Grid item xs={5} md={2}>
          <NetworkIcon />
        </Grid>
        <Grid item xs={7} md={4}>
          <ContactInfo />
        </Grid>
        <Grid item xs={12} md={6}>
          <SummaryInfo />
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

export default NetworkInformation;
