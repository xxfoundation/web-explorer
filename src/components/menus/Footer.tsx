import { Grid } from '@mui/material';
import React from 'react';
import { ListLink } from './menu.styles';

const FooterMenu = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <ListLink to='/' underline='hover'>
          Home
        </ListLink>
        <ListLink to='https://xx.network/mission/' underline='hover' rel='noopener' target='_blank'>
          Mission
        </ListLink>
        <ListLink
          to='https://xx.network/messenger/'
          underline='hover'
          rel='noopener'
          target='_blank'
        >
          xx messenger
        </ListLink>
        <ListLink to='https://xx.network/' underline='hover' rel='noopener' target='_blank'>
          xx network
        </ListLink>
        <ListLink to='https://xx.network/coin/' underline='hover' rel='noopener' target='_blank'>
          xx coin
        </ListLink>
      </Grid>
      <Grid item xs>
        <ListLink to='https://xx.network/nodes' underline='hover' rel='noopener' target='_blank'>
          Node Runners
        </ListLink>
        <ListLink
          to='https://xx.network/developers'
          underline='hover'
          rel='noopener'
          target='_blank'
        >
          Developers
        </ListLink>
        <ListLink to='https://explorer.xx.network' underline='hover' rel='noopener' target='_blank'>
          Explorer
        </ListLink>
        <ListLink
          to='https://dashboard.xx.network'
          underline='hover'
          rel='noopener'
          target='_blank'
        >
          cMix Dashboard
        </ListLink>
        <ListLink to='https://forum.xx.network' underline='hover' rel='noopener' target='_blank'>
          Technical Forum
        </ListLink>
      </Grid>
      <Grid item xs={12} md='auto'>
        <ListLink
          to='https://xx.network/overview/'
          underline='hover'
          rel='noopener'
          target='_blank'
        >
          Overview
        </ListLink>
        <ListLink
          to='https://xx.network/resources/'
          underline='hover'
          rel='noopener'
          target='_blank'
        >
          Resources
        </ListLink>
        <ListLink to='https://xx.network/faq/' underline='hover' rel='noopener' target='_blank'>
          FAQ
        </ListLink>
        <ListLink to='https://xx.network/team/' underline='hover' rel='noopener' target='_blank'>
          Team
        </ListLink>
        <ListLink to='https://xx.network/contact/' underline='hover' rel='noopener' target='_blank'>
          Contact Us
        </ListLink>
      </Grid>
    </Grid>
  );
};

export default FooterMenu;
