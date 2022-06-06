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
        <ListLink to='https://xx.network/mission/' underline='hover'>
          Mission
        </ListLink>
        <ListLink to='https://xx.network/messenger/' underline='hover'>
          xx messenger
        </ListLink>
        <ListLink to='https://xx.network/' underline='hover'>
          xx network
        </ListLink>
        <ListLink to='https://xx.network/coin/' underline='hover'>
          xx coin
        </ListLink>
      </Grid>
      <Grid item xs>
        <ListLink to='https://xx.network/category/node-info/' underline='hover'>
          Node Runners
        </ListLink>
        <ListLink to='https://xx.network/category/for-developers/' underline='hover'>
          Developers
        </ListLink>
        <ListLink to='https://explorer.xx.network' underline='hover'>
          Explorer
        </ListLink>
        <ListLink to='https://dashboard.xx.network' underline='hover'>
          cMix Dashboard
        </ListLink>
        <ListLink to='https://forum.xx.network' underline='hover'>
          Technical Forum
        </ListLink>
      </Grid>
      <Grid item xs={12} md='auto'>
        <ListLink to='https://xx.network/overview/' underline='hover'>
          Overview
        </ListLink>
        <ListLink to='https://xx.network/resources/' underline='hover'>
          Resources
        </ListLink>
        <ListLink to='https://xx.network/faq/' underline='hover'>
          FAQ
        </ListLink>
        <ListLink to='https://xx.network/team/' underline='hover'>
          Team
        </ListLink>
        <ListLink to='https://xx.network/contact/' underline='hover'>
          Contact Us
        </ListLink>
      </Grid>
    </Grid>
  );
};

export default FooterMenu;
